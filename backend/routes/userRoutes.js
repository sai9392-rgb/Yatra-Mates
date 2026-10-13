const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// True for a non-empty string. Rejects missing fields and
// objects like {"$ne": null} that try to trick the database query.
function isText(value) {
    return typeof value === "string" && value.trim() !== "";
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!isText(name) || !isText(email) || !isText(password)) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters."
            });
        }

        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful!"
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email is already registered."
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Server error during registration."
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!isText(email) || !isText(password)) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // Same message for a wrong email or a wrong password,
        // so nobody can use login to find out who is registered.
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Never send the password hash back to the browser.
        res.json({
            message: "Login successful!",
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
});

module.exports = router;
