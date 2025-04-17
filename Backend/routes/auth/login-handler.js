const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { verifyPassword } = require('../../utils/passwords');
const { tokenize } = require('../../utils/tokenize');
const { Permit } = require('../../Database/models')

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


        const latestPermit = await Permit.findOne({ order: [['createdAt', 'DESC']] });
        let nextPermitNumber = 'LLA 1';
        if (latestPermit?.permitNumber) {
            const lastNum = parseInt(latestPermit.permitNumber.replace('LLA ', '')) || 0;
            nextPermitNumber = `LLA ${lastNum + 1}`;
        }



        const token = tokenize(user.id, user.email, user.role);

        // res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
        res.status(200).json({id:user.id, message: `success`,name:user.name,role:user.role, permitNumber: nextPermitNumber, });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { loginUser }
