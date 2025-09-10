import express from 'express';
import { User } from '../db/schema.js';

const router = express.Router();

router.put('/updateAccount', async (req, res) => {
    try {
        const sessionUser = req.session.user;
        if (!sessionUser) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { avatar } = req.body;
        const user = await User.findByIdAndUpdate(sessionUser._id, { avatar }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        req.session.user = user;
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error updating account:', error);
    }
});

export default router;