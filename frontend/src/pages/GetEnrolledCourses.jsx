import React, { useEffect, useState } from 'react'
import { getAllEnrolledCourses } from '../services/CourseService'
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

    return (
        <div className="space-y-7 max-w-full">
            {enrolledCourses.map(({ enrollmentId, course, instructor }) => (
                <div key={enrollmentId} className="border rounded p-4 shadow">

                    {/* Course name */}
                    <h3 className="font-bold text-3xl">{course.title}</h3>

                    {/* Description */}
                    <h3 className="font-bold text-md text-gray-800 mt-4">
                    About
                    </h3>
                    <p className="text-gray-500">{course.description}</p>

                    {/* Content */}
                    <h3 className="font-bold text-md text-gray-800">
                    Content
                    </h3>
                    <p className="text-gray-500">{course.content}</p>

                    {/* Instructor */}
                    <h3 className="font-bold text-md">
                    Instructor Details
                    </h3>
                    <p className="text-gray-600">
                        {instructor.firstname} {instructor.lastname}
                    </p>
                </div>
            ))}
    </div>
    )
}

export default GetEnrolledCourses