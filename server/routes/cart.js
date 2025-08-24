import express from 'express';
import { User } from '../db/schema.js';

const router = express.Router();

router.post('/update', async (req, res) => {
    const { userId, cart } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { cart });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;