const Course = require('../models/course');

const findCourseExist = async(courseId) => {
    const exsitingCourse = await Course.findById(courseId);
        if(!exsitingCourse){
            const error = new Error('Course not found!');
            error.status = 404;
            throw error;
        }
    
    return exsitingCourse;
}

module.exports = { findCourseExist }