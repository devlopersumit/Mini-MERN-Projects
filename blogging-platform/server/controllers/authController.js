const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//Register user
const signup = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exist' });
        }
        // 2️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ Save the new user
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        // 4️⃣ Generate token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 5️⃣ Return user info + token
        res.status(200).json({ message: 'user created successfully!', token }, {
            id: User._id,
            name: User.userName,
            email: User.email,
        },);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Login user
const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'user not found' });
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            res.status(400).json({ message: 'invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ message: 'Login succesfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get Profile
const getProfile = (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, getProfile };


