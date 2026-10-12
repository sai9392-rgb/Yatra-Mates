const express = require("express");
const cors = require("cors");

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

app.listen(5000, () => {
    console.log("Yatra Mates server running on port 5000");
});