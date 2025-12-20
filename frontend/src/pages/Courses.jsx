import React, { useEffect, useState } from 'react'
import { allAvailableCourses, enrollCourse, getAllEnrolledCourses } from '../services/CourseService'
import toast from 'react-hot-toast'
import CourseCard from '../components/CourseCard'

const Courses = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {

        const fetchCourses = async () => {

            try{
                const allPublishCourses = await allAvailableCourses()
                const allEnrolledCourses = await getAllEnrolledCourses()

                // Find course ids from enrolled courses
                const enrollCoursesIds = allEnrolledCourses.map((c) => c.course.id)

                // Find if enrollCoursId exist allPublishCourses Id
                const coursesWithStatus = allPublishCourses.map((course) => ({
                    ...course,
                    enrolled: enrollCoursesIds.includes(course._id) //  if its _id is in enrollCoursesIds. It sets enrolled: true if the student is already enrolled, otherwise false
                })); 

                setCourses(coursesWithStatus)
                console.log("Courser with status: ", coursesWithStatus)

                if (coursesWithStatus.length === 0){
                    toast("No courses available at the moment.")
                }
            } 
            catch (error) {
                toast.error(error.message);
            }
        }

        fetchCourses();

    }, [])

    const handleEnroll = async(courseId) => {

        try{
            const response = await enrollCourse(courseId)

            // Student response after succesfull enrollment
            toast.success(response.message)

            setCourses((prev) => 
                prev.map((course) =>
                    course._id === courseId
                    ? {...course, enrolled: true}
                    : course
                )
            )
        }
        catch(error){
            toast.error(error.message);
        }
        
    }

    return (
        <div className='p-6'>

            {/* Headline */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Available Courses
                </h1>
                <p className="text-gray-500 mt-2">
                    Start your learning journey by enrolling in a course that matches your goals.
                </p>
            </div>

            {/* Course card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} onEnroll={handleEnroll} />
                ))}
            </div>
        </div>
    )
}

export default Courses