const Course = require("../models/course");

const getAllPublishCourses = async () => {
  return await Course.find({isPublished: true}).lean();
};

module.exports = { getAllPublishCourses };