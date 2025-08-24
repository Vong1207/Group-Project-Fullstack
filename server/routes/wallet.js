import express from 'express';
import { User } from '../db/schema.js';

const router = express.Router();

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