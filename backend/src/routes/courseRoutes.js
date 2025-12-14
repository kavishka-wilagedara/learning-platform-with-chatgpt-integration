const express = require("express")
const { createCourse } = require("../controllers/courseController")
const { 
    getAllPublishedCourses,
    getAllCoursesByInsructorId,
    deleteCourseByInstructor,
    updateCourseByInstructor
} = require("../controllers/courseController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post(
    "/create",
    verifyToken,
    authorizeRoles('instructor'),   // Only instructor can create course
    createCourse
);

router.get(
    "/publish/all",
    verifyToken,
    authorizeRoles('student'),  // Only students visible all published courses
    getAllPublishedCourses
);

router.get(
    "/instructor/all",
    verifyToken,
    authorizeRoles('instructor'),   // Only instructors visible all published courses by them self
    getAllCoursesByInsructorId
)

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles('instructor'),
    deleteCourseByInstructor
)

router.patch(
    "/update/:id",
    verifyToken,
    authorizeRoles('instructor'),
    updateCourseByInstructor
)


module.exports = router