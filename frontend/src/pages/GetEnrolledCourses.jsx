import React, { useEffect, useState } from 'react'
import { 
    getAllEnrolledCourses,
    unenrollCourse
 } from '../services/CourseService'
import toast from 'react-hot-toast'

const GetEnrolledCourses = () => {

    const [enrolledCourses, setEnrolledCourses] = useState([])

    useEffect(() => {
        const fetchedEnrolledCourses = async () => {

            try{
                const allEnrolledCourses = await getAllEnrolledCourses()
                setEnrolledCourses(allEnrolledCourses)
                console.log("Enrolled courses: ", allEnrolledCourses)

                if(allEnrolledCourses.length === 0){
                    toast("You are not enroll with any course yet")
                }
            }
            catch (error) {
                toast.error(error.message);
            }
        }

        fetchedEnrolledCourses()
    }, [])

    const unenroll = async(coursId) => {

        try{
            const response = await unenrollCourse(coursId)
            // Student response after succesfull unenrollment
            toast.success(response.message)

            setEnrolledCourses(prev =>
            prev.filter(enrollment => enrollment.course.id !== coursId)
            )
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    My Enrolled Courses
                </h1>
                <p className="text-gray-500 mt-2">
                    Continue learning from the courses you’ve enrolled in
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(({ enrollmentId, course, instructor }) => (
                    <div 
                        key={enrollmentId} 
                        className="group bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl">

                        {/* Course name */}
                        <h2 className="text-2xl font-bold text-gray-800">
                            {course.title}
                        </h2>

                        {/* Description */}
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase">
                                About
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {course.description}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase">
                                Content
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                {course.content}
                            </p>
                        </div>

                        {/* Instructor */}
                        <div className="pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Instructor
                            </p>
                            <p className="font-semibold text-gray-800">
                                {instructor.firstname} {instructor.lastname}
                            </p>
                        </div>

                        {/* Unenroll button */}
                        <button
                            onClick={() => unenroll(course.id)}
                            className="mt-4 w-full px-4 py-2 rounded-lg font-bold text-white bg-red-400 hover:bg-red-500"
                        >
                            Unenroll Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetEnrolledCourses