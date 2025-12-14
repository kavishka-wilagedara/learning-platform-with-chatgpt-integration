const Course = require("../models/course")
const { findCourseExist } = require("./findCourseExist")

/**
 * Fetch course by ID and check if the current user is the owner of course (instructor).
 * Throwa error if the course does not exist or user is not authorized.
 *
 * @param {string} courseId - The course _id to fetch
 * @param {object} user - The current user { id }
 * @returns {object} - The course document
 * @throws {Error} - If not found or unauthorized
 */

const fetchCourseAndAuthorize = async(courseId, user) => {

    // Find course is exists
    const fetchCourse = await findCourseExist(courseId);

    //  Only the instructor can delete / update who posted courses
    const instructorId = user.id;
    const fetchCourseInstructorId = fetchCourse.instructorId.toString()
    console.log(`Instructor ID: ${instructorId} | fetchCourse Instructor ID: ${fetchCourseInstructorId}`)
    if(instructorId !== fetchCourseInstructorId){
        const error = new Error('Access denied!')
        error.status = 403
        throw error
    }

    return fetchCourse;
}

module.exports = { fetchCourseAndAuthorize }