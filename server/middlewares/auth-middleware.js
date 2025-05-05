const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

// Protected Routes based on token
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET_KEY
        );
        // console.log("require signIn decoded value",decode);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// admin access
const isAdmin = async (req, res, next) => {
    try {
        // console.log(req.user)
        const user = await User.findById(req.user._id)
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access'
            })
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Error in admin middleware',
            error,
        });
    }
}

module.exports = { requireSignIn, isAdmin }