const bcrypt = require("bcryptjs")
const User = require("../models/user")
const generateToken = require("../utils/generateToken")
const {validateRegister, roleValidate} = require("../utils/validators/userValidator") 

const register =  async(req, res) => {
    try{
        // Validate user inputs
        const error = validateRegister(req.body)
            if (error) {
                return res.status(400).json({ 
                    success: false,
                    message: error })
            }

        const {firstname, lastname, username, password, role} = req.body

        // Username validation
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'Username already in use!'})
        }

        // Role validate and assigning
        const assignedRole = roleValidate(req.body);

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstname,
            lastname, 
            username,
            password: hashedPassword,
            role: assignedRole
        })
        console.log(`User registered successfully | ID: ${newUser._id}, Role: ${newUser.role}`)

        // Generate the token using the id and role
        const token = generateToken(newUser._id, newUser.role)

        console.log('Sending success response to client.')
        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                role: newUser.role
            }
        })
    }
    catch(error){
        console.error('User registation failed: ', error)

        res.status(500).json({
            success: false,
            message: 'User registration failed!'})
    }

}

const login = async(req, res) => {
    try{
        const {username, password} = req.body;

        // Find username
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid credential!'})
        }

        // Compare password
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if(!isMatchPassword){
            return res.status(401).json({
                success: false,
                message: 'Invalid credential!'})
        }

        // Generate the token
        const token = generateToken(user._id, user.role)

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                role: user.role
            }
        })
        console.log(`Login successfully. ID: ${user._id}, Role: ${user.role}`)

    }catch(error){
        console.error("Login failed: ", error)

        res.status(500).json({
            success: false,
            message: 'Login failed!'})
    }    
}

module.exports = {
    register,
    login
}