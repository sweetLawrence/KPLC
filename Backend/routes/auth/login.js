require('dotenv').config(); 

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { loginUser } = require('./login-handler');

const { User } = require('../../Database/models');
router.use(cookieParser());


router.post('/login', (req, res) => loginUser(req, res, User));


module.exports = router;