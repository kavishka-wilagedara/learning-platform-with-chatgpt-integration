const express = require("express")
const { 
    studentEnrollment,
    studentUnenrollment
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
    authorizeRoles('student'),  // Only student can enroll the course
    studentUnenrollment
)

module.exports = router