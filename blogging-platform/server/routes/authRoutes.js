const express = require('express');
const { signup, login, getProfile } = require('../controllers/authController');
const userAuth = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.post('/register', signup);
authRouter.post('/login', login);
authRouter.get('/me', userAuth, getProfile);

module.exports = authRouter;