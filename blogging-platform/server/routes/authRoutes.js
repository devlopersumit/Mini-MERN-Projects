const express = require('express');
const { signup, login, getProfile } = require('../controllers/authController');
const userAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/me', userAuth, getProfile);

module.exports = router;