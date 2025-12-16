const Enrollment = require("../models/enrollment")

const deleteAllEnrollments = async(courseId) => {

    // Remove all enrollments
    await Enrollment.deleteMany({courseId})
    console.log('Delete all enrollments with Course Id: ', courseId)
}

module.exports = { deleteAllEnrollments}