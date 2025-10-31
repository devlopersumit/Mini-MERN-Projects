const jwt = require('jsonwebtoken');
const user = require('../models/user');

const userAuth = async (req, res, next) => {
    
    try{
         // Step 1: Check if token exists
        const token = req.headers.authorization.split("")[1];

        if(!token) {
            res.status(401).json({message:'Unauthorized'});
        }
         // Step 2: Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Step 3: Find user based on decoded id
        const user = await user.findById(decoded.id).select("-password");
        req.user = user;
        next();
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = userAuth;