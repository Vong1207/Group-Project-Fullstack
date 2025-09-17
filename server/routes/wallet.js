/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import express from 'express';
import { User } from '../db/schema.js';

const router = express.Router();

// Update wallet balance
router.post('/update', async (req, res) => {
    const { userId, walletBalance } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { walletBalance });
        const updatedUser = await User.findById(userId);
        req.session.user.walletBalance = updatedUser.walletBalance;
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router