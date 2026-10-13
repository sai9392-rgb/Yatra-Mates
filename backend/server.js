require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve the website (the frontend folder) from this same server
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/api/trips", (req, res) => {

    const trips = [
        {
            id: 1,
            destination: "Manali",
            duration: "3 Days / 2 Nights",
            budget: 6500
        },
        {
            id: 2,
            destination: "Goa",
            duration: "4 Days / 3 Nights",
            budget: 7200
        },
        {
            id: 3,
            destination: "Ooty",
            duration: "3 Days / 2 Nights",
            budget: 5500
        }
    ];

    res.json(trips);
});

app.use("/api/users", userRoutes);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, (error) => {
            // Express 5 passes startup errors here (e.g. port already in use)
            if (error) {
                console.error(`Could not start on port ${PORT}: ${error.message}`);
                console.error("Is Yatra Mates already running in another terminal?");
                process.exit(1);
            }

            console.log(`Yatra Mates is running: open http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
