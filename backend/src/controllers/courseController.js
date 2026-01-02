const Course = require("../models/course")
const {validateCourseCreateOrUpdate} = require("../utils/validators/courseValidator")
const { fetchCourseAndAuthorize } = require("../services/courseChangesAuthorization")
const { applyCourseUpdates } = require("../services/courseUpdate")
const { deleteAllEnrollments } = require("../services/deleteEnrollment")

const createCourse = async(req, res) => {

    try{
        // Validate course inputs
        const error = validateCourseCreateOrUpdate(req.body, false)
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

        // Fetch and authorize before delete
        const fetchCourse = await fetchCourseAndAuthorize(courseId, loggedUser);

        // Remove enrollments history
        deleteAllEnrollments(courseId)
        
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

const updateCourseByInstructor = async(req, res) => {
    try{
        const courseId = req.params.id;
        const loggedUser = req.user;

        console.log("Update course id: ", courseId)

        // Validate course inputs
        const error = validateCourseCreateOrUpdate(req.body, true)
        if(error){
            return res.status(400).json({
                success: false,
                message: error
            })
        }

        // Fetch and authorize before update
        const fetchCourse = await fetchCourseAndAuthorize(courseId, loggedUser);

        // Allowed only update required fields
        applyCourseUpdates(fetchCourse, req.body, [
            "title",
            "description",
            "content",
            "isPublished"
        ])

        // Save updated course
        await fetchCourse.save();
        console.log(`Course updated successfully | ID: ${fetchCourse._id}`)

        // Map response fields
        const updatedResponse = {
            id: fetchCourse._id,
            title: fetchCourse.title,
            description: fetchCourse.description,
            content: fetchCourse.content,
            isPublished: fetchCourse.isPublished,
            createdAt: fetchCourse.createdAt,
            updatedAt: fetchCourse.updatedAt
            
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedResponse
        });
    }

    catch(error){
        console.error('Failed to update course', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update course!'
        })
    }
}

module.exports = {
    createCourse,
    getAllPublishedCourses,
    getAllCoursesByInsructorId,
    deleteCourseByInstructor,
    updateCourseByInstructor
}
