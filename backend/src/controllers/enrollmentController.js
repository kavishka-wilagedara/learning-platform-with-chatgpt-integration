const { findCourseExist } = require("../services/findCourseExist")
const Enrollment = require("../models/enrollment");
const course = require("../models/course");
const { fetchCourseAndAuthorize } = require("../services/courseChangesAuthorization")

const studentEnrollment = async(req, res) => {
    try{
        const studentId = req.user.id;
        const { courseId } = req.body;

        // Find course is exists
        const fetchCourse = await findCourseExist(courseId);

        if(!fetchCourse.isPublished){
            return res.status(400).json({
                success: false,
                message: 'Course is not available at the moment!'
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

    try{

        const studentId = req.user.id;
        const { courseId } = req.body;

        // Find course is exists
        const fetchCourse = await findCourseExist(courseId);

        let enrollment = await Enrollment.findOne({ studentId, courseId});

        if(!enrollment){
            return res.status(400).json({
                success: false,
                message: 'You have not enroll to this course!'
            })
        }

        // Already dropped
        if (enrollment && enrollment.status === 'dropped'){
            return res.status(400).json({
                success: false,
                message: 'You are already dropped this course!'
            })
        }

        if (enrollment && enrollment.status === 'enrolled'){
            enrollment.status = 'dropped';
            await enrollment.save();

            console.log(`Dropped course | Student ID: ${studentId}, Course ID: ${courseId}`)
            return res.status(200).json({
                success: true,
                message: 'Dropped course successfully!',
                enrollment
            })
        }
    }

    catch(error){
        console.error('Course droping failed: ', error)

        return res.status(500).json({
            success: false,
            message: 'Course droping failed'
        })
    }
    
}

const getAllEnrolledCoursesByStudent = async(req, res) => {

    try{
        const studentId = req.user.id;

        const enrollments = await Enrollment.find({
            studentId,
            status: "enrolled"
        })
        .populate({
            path: 'courseId',
            select: 'title description content instructorId',
            populate: {
                path: 'instructorId',
                select: 'firstname lastname'
            }
        })
        .lean();

        console.log("enrollments | ", enrollments)

        // Map response fields
        const enrolledCoursesResponse = enrollments.map((enrollment) => ({
            enrollmentId: enrollment._id,
            course: {
                id: enrollment.courseId._id,
                title: enrollment.courseId.title,
                description: enrollment.courseId.description,
                content: enrollment.courseId.content,
            },
            instructor: {
                id: enrollment.courseId.instructorId._id,
                firstname: enrollment.courseId.instructorId.firstname,
                lastname: enrollment.courseId.instructorId.lastname
            }
        }))

        res.status(200).json({
            success: true,
            count: enrolledCoursesResponse.length,
            data: enrolledCoursesResponse
        });
    }

    catch (error) {
        console.error('Failed to fetch enrolled courses', error);
            
        res.status(500).json({
            success: false,
            message: 'Failed to fetch enrolled courses'
        });
    }
}

const getAllEnrolledStudentsByCourse = async(req, res) => {

    try{

        const courseId = req.params.id;
        const loggedUser = req.user;

        const requiredCourse = await fetchCourseAndAuthorize(courseId, loggedUser);

        const enrollments = await Enrollment.find({
            courseId,
            status: 'enrolled'
        })
        .populate({
            path: 'studentId',
            select: 'firstname lastname'
        })
        .lean();

        // Map response fields
        const enrolledStudentsResponse = enrollments.map((enrollment) => ({
            enrollmentId: enrollment._id,
            student: {
                id: enrollment.studentId._id,
                firstname: enrollment.studentId.firstname,
                lastname: enrollment.studentId.lastname,
            },
            enrollmentDetails: {
                enrollmentCount: enrollment.enrolledTimes,
                firstEnrolledDate: enrollment.createdAt,
                lastEnrollmentDate: enrollment.updatedAt
            }
        }))

        res.status(200).json({
            success: true,
            count: enrolledStudentsResponse.length,
            data: enrolledStudentsResponse
        });

    }
    catch (error) {
        console.error('Failed to fetch enrolled students', error);
            
        res.status(500).json({
            success: false,
            message: 'Failed to fetch enrolled students'
        });
    }
}

module.exports = {
    studentEnrollment,
    studentUnenrollment,
    getAllEnrolledCoursesByStudent,
    getAllEnrolledStudentsByCourse
}