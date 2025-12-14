const express = require("express")
const { createCourse } = require("../controllers/courseController")
const { getAllPublishedCourses } = require("../controllers/courseController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")

router.post(
    "/create",
    verifyToken,
    authorizeRoles('instructor'),
    createCourse
);

router.get("/publish/all",
    verifyToken,
    authorizeRoles('student'),   // Only students visible all published courses
    getAllPublishedCourses
);

module.exports = router