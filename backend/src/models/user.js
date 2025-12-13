const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'firstname is required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'lastname is required'],
            trim: true

        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            trim: true,
            minlength: 8
        },
        role: {
            type: String,
            required: true,
            enum: ["student", "instructor"],
            default: "student"
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)