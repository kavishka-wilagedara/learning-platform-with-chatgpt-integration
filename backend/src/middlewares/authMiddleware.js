const jwt = require("jsonwebtoken")
const User = require("../models/user")

const verifyToken = async(req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log('auth header: ', authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: "Authorization token required"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const userId = decodedToken.id;
        const userRole = decodedToken.role
        req.user = {
            id: userId,
            role: userRole
        }
        console.log(`The decoded user |, ID: ${userId}, Role: ${userRole}`)
        
        next();
    }
    catch(error){
        console.error('Token verification failed: ', error)

        return res.status(401).json({
            success: false,
            message: 'Token invalid or expired!'
        })
    }

}

module.exports = {
    verifyToken
}