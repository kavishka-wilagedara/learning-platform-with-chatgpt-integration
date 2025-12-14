const express = require("express")
const { studentEnrollment } = require("../controllers/enrollmentController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post(
    "/student",
    verifyToken,
    authorizeRoles('student'),  // Only student can enroll the course
    studentEnrollment
)

module.exports = router