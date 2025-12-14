const express = require("express")
const { createCourse } = require("../controllers/courseController")
const { getAllPublishedCourses } = require("../controllers/courseController")
const router = express.Router()
const {verifyToken} = require("../middlewares/authMiddleware")

router.post("/create", verifyToken, createCourse)
router.get("/publish/all", verifyToken, getAllPublishedCourses)

module.exports = router