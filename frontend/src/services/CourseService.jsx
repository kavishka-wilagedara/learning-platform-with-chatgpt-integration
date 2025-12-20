import axios from "axios";
import { authHeader } from "./AuthService";

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

export const allAvailableCourses = async() => {

    try{
        const response = await axios.get(
            `${backendApiUrl}/course/publish/all`, {
                headers: authHeader()   // Attach jwt token
            }
        )
        
        if (response.data.count === 0) {
            console.warn("No courses available.")
        }

        return response.data.data
    }
    catch(error){
        // Set backend error
        const message = 
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch courses, Try again later"

        throw new Error(message);
    }
}

export const getAllEnrolledCourses = async() => {

    try{
        const response = await axios.get(
            `${backendApiUrl}/enrollment/student/courses`, {
                headers: authHeader()   // Attach jwt token
            }
        )

        if (response.data.count === 0) {
            console.warn("No courses available.")
        }
        
        return response.data.data
    }
    catch(error){
        // Set backend error
        const message = 
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch enrolles courses, Try again later"

        throw new Error(message)
    }
}

export const enrollCourse = async(courseId) => {

    try {
        const response = await axios.post(
            `${backendApiUrl}/enrollment/student`, 
            { courseId },
            { headers: authHeader() }
        )

        return response.data
    }
    catch (error) {
        const message =
        error.response?.data?.message ||
        "Enrollment failed. Try again later.";

        throw new Error(message);
    }
}

export const unenrollCourse = async(courseId) => {

    console.log("Course Id: ",  courseId)

    try {
        const response = await axios.patch(
            `${backendApiUrl}/enrollment/student/drop`, 
            { courseId },
            { headers: authHeader() }
        )

        return response.data
    }
    catch (error) {
        const message =
        error.response?.data?.message ||
        "Unerollment failed. Try again later.";

        throw new Error(message);
    }
}