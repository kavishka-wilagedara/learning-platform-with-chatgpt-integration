const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String
        },
        isPublished: {
        type: Boolean,
        default: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema)