import express from "express";
import { User } from "../db/schema.js";
import { comparePasswords, hashPassword } from "../bcrypt/bcrypt.js";

const router = express.Router();

// Log in
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).populate("cart.product");
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
        console.error('Sign up error:', err);
        res.status(500).json({ message: "Server Internal", error: err.message });
    }
});

// Sign up
router.post("/signup", async (req, res) => {
    const { username, password, role, displayName, customerAddress, businessName, businessAddress, avatar } = req.body;
    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Prepare user data based on role
        let newUserData = {
            username,
            password: hashedPassword,
            role,
            avatar
        };

        if (role === 'Customer') {
            newUserData.displayName = displayName;
            newUserData.customerAddress = customerAddress;
            newUserData.walletBalance = 0;
            newUserData.cart = [];
            newUserData.purchased = [];
        } else if (role === 'Vendor') {
            newUserData.businessName = businessName;
            newUserData.businessAddress = businessAddress;
        } else if (role === 'Shipper') {
            newUserData.displayName = displayName;
        }

        // Create and save user
        const newUser = new User(newUserData);
        await newUser.save();

        res.status(201).json({ message: "Sign up successful" });
    } catch (err) {
        res.status(500).json({ message: "Server Internal" });
    }
});

export default router;
