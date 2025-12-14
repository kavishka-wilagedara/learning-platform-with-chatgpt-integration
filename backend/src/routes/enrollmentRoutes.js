const express = require("express")
const { 
    studentEnrollment,
    studentUnenrollment,
    getAllEnrolledCoursesByStudent,
    getAllEnrolledStudentsByCourse
 } = require("../controllers/enrollmentController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post(
    "/student",
    verifyToken,
    authorizeRoles('student'),  // Only student can enroll the course
    studentEnrollment
)

router.patch(
    "/student/drop",
    verifyToken,
    authorizeRoles('student'),  // Only student can unenroll the course
    studentUnenrollment
)

router.get(
    "/student/courses",
    verifyToken,
    authorizeRoles('student'),  // Only student can visible enrolled courses
    getAllEnrolledCoursesByStudent
)

router.get(
    "/instructor/students/:id",
    verifyToken,
    authorizeRoles('instructor'),  // Only instructor visible enrolled students
    getAllEnrolledStudentsByCourse
)

module.exports = router