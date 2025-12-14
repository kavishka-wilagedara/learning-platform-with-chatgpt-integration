const Course = require("../models/course")
const {validateCourseCreate} = require("../utils/validators/courseValidator")
const { fetchCourseAndAuthorize } = require("../services/courseChangesAuthorization")

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
        const instructorId = req.user.id
        console.log('Instructor: ', instructorId)

        const newCourse = await Course.create({
            title,
            description,
            instructorId,
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
                instructorId: newCourse.instructorId,
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
        .select('title description instructorId content')
        .populate('instructorId', 'firstname lastname')
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

const getAllCoursesByInsructorId = async(req, res) => {

    try{
        const instructorId = req.user.id

        const fetchedCourses = await Course.find({instructorId: instructorId})
            .select('title description content isPublished createdAt updatedAt')
            .lean();

        console.log(`Courses fetched | instructorId: ${instructorId}, count: ${fetchedCourses.length}`)
        return res.status(200).json({
            success: true,
            count: fetchedCourses.length,
            data: fetchedCourses
        })
    }
    catch(error){
        console.error('Failed to fetch course by instructor: ', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch course by instructor'
        })
    }
}

const deleteCourseByInstructor = async(req, res) => {
    try{
        const courseId = req.params.id;
        const loggedUser = req.user;

        // Fetch and authorize 
        const fetchCourse = await fetchCourseAndAuthorize(courseId, loggedUser);
        
        // Delete course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully!'
        })
    }
    catch(error){
        console.error('Failed to delete course', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to delete course!'
        })
    }
}



module.exports = {
    createCourse,
    getAllPublishedCourses,
    getAllCoursesByInsructorId,
    deleteCourseByInstructor
}
