const Course = require("../models/course")
const {validateCourseCreate} = require("../utils/validators/courseValidator")

const createCourse = async(req, res) => {

    try{
        // Validate course inputs
        const error = validateCourseCreate(req.body)
        if(error){
            return res.status(400).json({
                success: false,
                message: error
            })
        }

        const { title, description, content, isPublished } = req.body
        const instructor = req.user.id

        const newCourse = await Course.create({
            title,
            description,
            instructor,
            content,
            isPublished: isPublished ?? true
        })
        console.log(`Course created successfully | ID: ${newCourse._id}, Title: ${newCourse.title}`)

        res.status(201).json({
            success: true,
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

        res.status(500).json({
            success: false,
            message: 'Course registration failed!'})
    }
}

const getAllPublishedCourses = async(req, res) => {
    try {
    const courses = await Course.find({isPublished: true})
        .select('title description instructor content')
        .populate('instructor', 'firstname lastname')
        .lean()

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });

  } catch (error) { 
    console.error('Course fetching failed: ', error);

    res.status(500).json({ 
        success: false,
        message: 'Failed to fetch courses' }); }
}

module.exports = {
    createCourse,
    getAllPublishedCourses
}
