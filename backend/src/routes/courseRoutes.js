const express = require("express")
const { createCourse } = require("../controllers/courseController")
const { getAllPublishedCourses } = require("../controllers/courseController")
const router = express.Router()

router.post("/create", createCourse)
router.get("/all", getAllPublishedCourses)

module.exports = router