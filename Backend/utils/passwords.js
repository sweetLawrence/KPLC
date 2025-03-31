const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
}