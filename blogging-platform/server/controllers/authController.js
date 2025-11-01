const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//Register user
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Save the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 4️⃣ Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5️⃣ Send response
    res.status(200).json({
      message: "User created successfully!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
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
            return res.status(400).json({ message: 'user not found' });
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return res.status(400).json({ message: 'invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ 
            message: 'Login successfully', 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get Profile
 const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { signup, login, getProfile };


