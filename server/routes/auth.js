import express from "express";
import { User } from "../db/schema.js";
import { comparePasswords } from "../bcrypt/bcrypt.js";

const router = express.Router();

// Đăng nhập
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }
        // Lưu thông tin user vào session
        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
            displayName: user.displayName || user.businessName
        };
        res.json({ message: "Đăng nhập thành công", user: req.session.user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

export default router;
