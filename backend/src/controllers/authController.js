const bcrypt = require("bcryptjs")
const User = require("../models/user")
const generateToken = require("../utils/generateToken")
const {validateRegister} = require("../utils/validators/userValidator")

const register =  async(req, res) => {
    try{
        // Validate user inputs
        const error = validateRegister(req.body)
            if (error) {
                console.error('error', error)
                return res.status(400).json({ message: error })
            }

        const {firstname, lastname, username, password, role} = req.body

        // Username validation
        const existingUser = await User.findOne({ username })
        if(existingUser){
            return res.status(400).json({message: 'Username already in use!'})
        }

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstname,
            lastname, 
            username,
            password: hashedPassword,
            role: role || 'student'
        })
        await newUser.save()
        console.log(`User registered successfully. ID: ${newUser._id}, Role: ${newUser.role}`)

        // Generate the token using the id and role
        const token = generateToken(newUser._id, newUser.role)

        console.log('Sending success response to client.')
        res.status(201).json({
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
        res.status(500).json({message: 'User registration failed!'})
    }

}

const login = async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(404).json({message: 'Invalid credential!'})
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)

        if(!isMatchPassword){
            return res.status(400).json({message: 'Invalid password!'})
        }

        // Generate the token using the id and role
        const token = generateToken(user._id, user.role)

        res.status(200).json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role
            }
        })

    }catch(error){
        console.error("Login failed: ", error)
        res.status(500).json({message: 'Login failed!'})
    }    
}

module.exports = {
    register,
    login
}