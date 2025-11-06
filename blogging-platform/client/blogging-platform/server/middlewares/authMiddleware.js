const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const userAuth = async (req, res, next) => {
  try {
    // Step 1: Check if token exists
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    // Step 2: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Step 3: Find user
    const foundUser = await User.findById(decoded.id).select("-password");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Attach user and continue
    req.user = foundUser;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth;
