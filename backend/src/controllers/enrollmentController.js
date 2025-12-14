const Course = require("../models/course")
const Enrollment = require("../models/enrollment")

const studentEnrollment = async(req, res) => {
    try{
        const studentId = req.user.id;
        const { courseId } = req.body;

        // Validate course
        const exsitingCourse = await Course.findById(courseId);
        if(!exsitingCourse){
            return res.status(404).json({
                success: false,
                message: 'Course not found!'
            })
        }

        let enrollment = await Enrollment.findOne({ studentId, courseId});

        // Already enrolled
        if (enrollment && enrollment.status === 'enrolled'){
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course!'
            })
        }

        // Re-enroll after the drop
        if (enrollment && enrollment.status === 'dropped'){
            enrollment.status = 'enrolled';
            enrollment.enrolledTimes += 1;
            await enrollment.save();

            console.log(`Re-enrolled student | ID: ${studentId}, CourseID: ${courseId}`)
            return res.status(200).json({
                success: true,
                message: 'Re-enrolled successfully!',
                enrollment
            })
        }

        // New enrollment
        enrollment = await Enrollment.create({
            studentId,
            courseId,
            status: "enrolled",
            enrolledTimes: 1
        })

        console.log(`Enrolled student | ID: ${studentId}, Course ID: ${courseId}`)
        return res.status(201).json({
            success: true,
            message: 'Enrolled successfully!',
            enrollment
        })
    }
    catch(error){
        console.error('Enrollment failed: ', error)

        return res.status(500).json({
            success: false,
            message: 'Enrollment failed'
        })
    }
}

const studentUnenrollment = async(req, res) => {
    
}

module.exports = {
    studentEnrollment
}