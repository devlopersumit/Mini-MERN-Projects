const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// ---------------------- AUTH MIDDLEWARE ----------------------
const auth = (req, res, next) => {
  // 1️⃣ Get token from cookies (instead of headers)
  const token = req.cookies.token;

  // 2️⃣ If no token, block access
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token found" });
  }

  try {
    // 3️⃣ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach decoded user info to request object
    req.user = decoded; // { id: userId }

    // 5️⃣ Continue to next middleware or controller
    next();
  } catch (error) {
    // 6️⃣ Handle invalid or expired token
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
