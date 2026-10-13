require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Yatra Mates Backend is Running!");
});

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

        app.listen(PORT, () => {
            console.log(`Yatra Mates server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
