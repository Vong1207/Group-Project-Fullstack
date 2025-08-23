import express from "express";
import { User } from "../db/schema.js";
import { comparePasswords } from "../bcrypt/bcrypt.js";

const router = express.Router();

// Log in
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }

        // Save user info in session based on role
        let sessionUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar
        };

        if (user.role === 'Customer') {
            sessionUser.displayName = user.displayName;
            sessionUser.customerAddress = user.customerAddress;
            sessionUser.walletBalance = user.walletBalance;
            sessionUser.cart = user.cart;
            sessionUser.purchased = user.purchased;
        } else if (user.role === 'Vendor') {
            sessionUser.businessName = user.businessName;
            sessionUser.businessAddress = user.businessAddress;
        } else if (user.role === 'Shipper') {
            sessionUser.displayName = user.displayName;
        }

        req.session.user = sessionUser;
        res.json({ message: "Successfully Log in", user: req.session.user });
    } catch (err) {
        res.status(500).json({ message: "Server Internal" });
    }
});

export default router;
