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