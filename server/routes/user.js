/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
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