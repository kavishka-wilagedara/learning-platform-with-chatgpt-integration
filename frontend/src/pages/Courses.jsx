import React, { useEffect, useState } from 'react'
import { allAvailableCourses, getAllEnrolledCourses } from '../services/CourseService'
import toast from 'react-hot-toast'
import CourseCard from '../components/CourseCard'

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

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

                if (coursesWithStatus.length === 0){
                    toast.info("No courses available at the moment.")
                }
            } 
            catch (error) {
            toast.error(error.message);
            }
        }

        fetchCourses();

    }, [])

    const handleEnroll = async(courseId) => {

        
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} onEnroll={handleEnroll} />
            ))}
        </div>
    )
}

export default Courses