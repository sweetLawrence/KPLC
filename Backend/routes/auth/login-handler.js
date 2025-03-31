const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { verifyPassword } = require('../../utils/passwords');
const { tokenize } = require('../../utils/tokenize');

router.use(cookieParser());

const loginUser = async (req, res, model) => {
    const { email, password } = req.body;

    try {
        const user = await model.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: `${model.name} not found` });
        }

        const hashedPassword = user.password;
        const match = await verifyPassword(password, hashedPassword);
        

        if (match === false) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = tokenize(user.id, user.email, user.role);

        // res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
        res.status(200).json({id:user.id, message: `success`,name:user.name,role:user.role });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { loginUser }
