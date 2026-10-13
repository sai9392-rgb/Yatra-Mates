// One command to run Yatra Mates: npm start
// 1. Installs backend packages (first run only)
// 2. Creates backend/.env for a local database if it's missing
// 3. Starts MongoDB if the database is local and not running yet
// 4. Starts the server, which also serves the website

const { execSync, spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");

const backendDir = path.join(__dirname, "backend");
const envFile = path.join(backendDir, ".env");
const mongoDir = path.join(os.homedir(), "MongoDB");

function isPortOpen(port) {
    return new Promise((resolve) => {
        const socket = net.connect(port, "127.0.0.1");
        socket.setTimeout(1000);
        socket.once("connect", () => { socket.destroy(); resolve(true); });
        socket.once("timeout", () => { socket.destroy(); resolve(false); });
        socket.once("error", () => resolve(false));
    });
}

// mongod on the PATH, or a copy in the MongoDB folder of your home folder
function findMongod() {
    const candidates = ["mongod", path.join(mongoDir, "mongod.exe"), path.join(mongoDir, "mongod")];
    return candidates.find((file) => spawnSync(file, ["--version"]).status === 0);
}

async function startMongo(port) {
    const mongod = findMongod();

    if (!mongod) {
        console.error(
            "\nMongoDB is not running and was not found on this computer.\n" +
            "Either install MongoDB Community Server (default options start it automatically):\n" +
            "  https://www.mongodb.com/try/download/community\n" +
            "or put a MongoDB Atlas connection string in backend/.env as MONGO_URI=...\n"
        );
        process.exit(1);
    }

    const dataDir = path.join(mongoDir, "data");
    const logFile = path.join(mongoDir, "mongod.log");
    fs.mkdirSync(dataDir, { recursive: true });

    console.log("Starting MongoDB...");
    spawn(mongod, [
        "--dbpath", dataDir,
        "--bind_ip", "127.0.0.1",
        "--port", String(port),
        "--logpath", logFile
    ], { stdio: "ignore" });

    for (let i = 0; i < 40; i++) {
        if (await isPortOpen(port)) return;
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.error("MongoDB did not start. Details: " + logFile);
    process.exit(1);
}

async function main() {
    if (!fs.existsSync(path.join(backendDir, "node_modules"))) {
        console.log("Installing backend packages (first run only)...");
        execSync("npm install --no-audit --no-fund", { cwd: backendDir, stdio: "inherit" });
    }

    if (!fs.existsSync(envFile)) {
        fs.writeFileSync(envFile, "MONGO_URI=mongodb://127.0.0.1:27017/YatraMates\n");
        console.log("Created backend/.env (local database).");
    }

    process.loadEnvFile(envFile);

    let db = null;
    try {
        db = new URL(process.env.MONGO_URI);
    } catch (error) {
        // Not a simple URL (e.g. missing): let server.js report it
    }

    if (db && ["127.0.0.1", "localhost"].includes(db.hostname)) {
        const port = Number(db.port) || 27017;

        if (!(await isPortOpen(port))) {
            await startMongo(port);
        }
    }

    // Press Ctrl+C to stop the server (and MongoDB, if it was started here)
    spawn(process.execPath, ["server.js"], { cwd: backendDir, stdio: "inherit" })
        .on("exit", (code) => process.exit(code ?? 0));
}

main();
