import express from "express";
import { User } from "../db/schema.js";
import { comparePasswords } from "../bcrypt/bcrypt.js";

const router = express.Router();

// Log in
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password. Check again!" });
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }
        // Save user info in session
        req.session.user = user;
        res.json({ message: "Successfully Log in", user: req.session.user });
    } catch (err) {
        res.status(500).json({ message: "Server Internal" });
    }
});

export default router;
