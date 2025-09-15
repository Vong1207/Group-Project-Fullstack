/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import bcrypt from "bcrypt";

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

export { hashPassword, comparePasswords };