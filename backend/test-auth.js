// Checks registration and login against the running backend.
// Start MongoDB and `node server.js` first, then run: npm test
// Each run adds one test user to the database.

const assert = require("node:assert");

const API_URL = "http://localhost:5000/api/users";

async function post(path, body) {
    const response = await fetch(API_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return { status: response.status, data: await response.json() };
}

async function main() {
    const email = "test-" + Date.now() + "@example.com";
    const password = "secret123";

    let r = await post("/register", { name: "Test User", email, password });
    assert.strictEqual(r.status, 201, "register new user");

    r = await post("/register", { name: "Test User", email, password });
    assert.strictEqual(r.status, 409, "register same email again");

    r = await post("/login", { email, password });
    assert.strictEqual(r.status, 200, "login with correct password");
    assert.strictEqual(r.data.user.name, "Test User");
    assert.strictEqual(r.data.user.password, undefined, "hash never sent");

    r = await post("/login", { email: " " + email.toUpperCase() + " ", password });
    assert.strictEqual(r.status, 200, "email case and spaces ignored");

    const wrongPassword = await post("/login", { email, password: "wrong123" });
    const unknownEmail = await post("/login", { email: "nobody@example.com", password });
    assert.strictEqual(wrongPassword.status, 401, "wrong password");
    assert.strictEqual(unknownEmail.status, 401, "unknown email");
    assert.strictEqual(wrongPassword.data.message, unknownEmail.data.message,
        "same message, so login doesn't reveal who is registered");

    r = await post("/login", { email });
    assert.strictEqual(r.status, 400, "missing password");

    r = await post("/login", { email: { "$ne": null }, password });
    assert.strictEqual(r.status, 400, "database trick object rejected");

    console.log("All register and login checks passed.");
}

main().catch((error) => {
    console.error("FAILED:", error.message);
    process.exit(1);
});
