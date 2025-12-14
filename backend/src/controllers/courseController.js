const Course = require("../models/course")
const {validateCourseCreate} = require("../utils/validators/courseValidator")


const createCourse = async(req, res) => {

    try{
        // Validate course inputs
        const error = validateCourseCreate(req.body)
        if(error){
            console.error('error', error)
            return res.status(400).json({message: error})
        }

        const { title, description, instructor, content, isPublished } = req.body

        const newCourse = new Course({
            title,
            description,
            instructor,
            content,
            isPublished: isPublished || true
        })
        await newCourse.save()
        console.log(`Course created successfully. ID: ${newCourse._id}, Title: ${newCourse.title}`)

        res.status(201).json({
            message: 'Course created successfully!',
            course: {
                id: newCourse._id,
                title: newCourse.title,
                description: newCourse.description,
                instructor: newCourse.instructor,
                content: newCourse.content,
                isPublished: newCourse.isPublished
            }
        })
    }
    catch(error){
        console.error('Course registation failed: ', error)
        res.status(500).json({message: 'Course registration failed!'})
    }
}

module.exports = {createCourse}
