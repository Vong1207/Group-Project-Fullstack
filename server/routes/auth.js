import express from "express";
import { User } from "../db/schema.js";
import { comparePasswords, hashPassword } from "../bcrypt/bcrypt.js";

const router = express.Router();

// Log in
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
            .populate("cart.product")
            .populate("purchased.product");
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
            sessionUser.walletBalance = user.walletBalance;
        } else if (user.role === 'Shipper') {
            sessionUser.displayName = user.displayName;
            sessionUser.distributionHub = user.distributionHub;
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
    const { username, password, role, displayName, customerAddress, businessName, businessAddress, distributionHub, avatar } = req.body;
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
            if (!displayName || displayName.length < 5) {
                return res.status(400).json({ message: "Display name must be at least 5 characters" });
            }
            if (!customerAddress || customerAddress.length < 5) {
                return res.status(400).json({ message: "Customer address must be at least 5 characters" });
            }
            newUserData.displayName = displayName;
            newUserData.customerAddress = customerAddress;
            newUserData.walletBalance = 0;
            newUserData.cart = [];
            newUserData.purchased = [];
        } else if (role === 'Vendor') {
            if (!businessName || businessName.length < 5) {
                return res.status(400).json({ message: "Business name must be at least 5 characters" });
            }
            if (!businessAddress || businessAddress.length < 5) {
                return res.status(400).json({ message: "Business address must be at least 5 characters" });
            }
            // Check unique businessName/businessAddress
            const existingVendor = await User.findOne({ $or: [ { businessName }, { businessAddress } ] });
            if (existingVendor) {
                return res.status(400).json({ message: "Business name or address already exists" });
            }
            newUserData.businessName = businessName;
            newUserData.businessAddress = businessAddress;
        } else if (role === 'Shipper') {
            if (!displayName || displayName.length < 5) {
                return res.status(400).json({ message: "Display name must be at least 5 characters" });
            }
            const validHubs = ['Ho Chi Minh', 'Da Nang', 'Ha Noi'];
            if (!distributionHub || !validHubs.includes(distributionHub)) {
                return res.status(400).json({ message: "Invalid or missing distribution hub" });
            }
            newUserData.displayName = displayName;
            newUserData.distributionHub = distributionHub;
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Create and save user
        const newUser = new User(newUserData);
        await newUser.save();

        res.status(201).json({ message: "Sign up successful" });
    } catch (err) {
        console.error('Sign up error:', err);
        res.status(500).json({ message: "Server Internal", error: err.message });
    }
});

export default router;
