const { connection } = require("../module/dbconfig");
const { authenticateUser } = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const app = express();
app.use(express.json());

const SECRET_KEY = "1324";

// Registration
let postregister = app.post("/register", async (req, res) => {
    console.log("Received Request:", req.body);
    const { username, password, role } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await connection.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, role]);

        res.json({ success: true, message: "user registered successfully" });
    } catch (error) {
        console.log("Error in registering user", error);
        res.status(500).json({ success: false, message: "Error in registering user" });
    }
});


let postLogin = app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await connection.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log("User data:", user);

        if (!user || user.length === 0 || !user[0].password) {
            return res.status(400).json({ success: false, message: "Authentication failed - User not found or password not set" });
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user[0].id, username: user[0].username, role: user[0].role }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: "Authentication failed - Incorrect password" });
        }
    } catch (error) {
        console.error("Database error in login route:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


module.exports = { postregister, postLogin };

