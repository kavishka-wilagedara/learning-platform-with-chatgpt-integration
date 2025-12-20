import axios from "axios";
import { authHeader } from "./AuthService";

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

export const getAllInstructorCourses = async() => {

    try{

        const response = await axios.get(
            `${backendApiUrl}/course/instructor/all`,
            {headers: authHeader()}
        )

        if (response.data.count === 0){
            console.warn("No posted courses available.")
        }

        return response.data.data
    }
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to fetch instructor courses";

        throw new Error(message);
    }
}

export const deleteCourse = async(courseId) => {

    try{
        const response = await axios.delete(
            `${backendApiUrl}/course/delete/${courseId}`,
            {headers: authHeader()} 
        )

        console.log("Delete status: ", response.data.message)
        return response.data.message
    }
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Deleting failed, Try again later"

        throw new Error(message);
    }
}

export const updateCourse = async (editingCourse, payload) => {
  
    try {
        console.log("Course Id: ", editingCourse)
        const response = await axios.patch(
            `${backendApiUrl}/course/update/${editingCourse}`,
            payload,
            { headers: authHeader() }
        )

        console.log("Updated course | ", response.data.data)
        return response.data;
    } 
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Updaing failed, Try again later"

        throw new Error(message);
    }
};

export const createNewCourse = async(courseData) => {

    try{
        const response = await axios.post(
            `${backendApiUrl}/course/create`,
            courseData,
            { headers: authHeader() }
        )

        console.log("New course: ", response.data.course)
        return response.data
    }
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Course creating failed, Try again later"

        throw new Error(message);
    }

}

export const getEnrolledStudents = async(courseId) => {

    try{
        console.log("Course ID: ", courseId)
        const response = await axios.get(
            `${backendApiUrl}/enrollment/instructor/students/${courseId}`,
            { headers: authHeader() }
        )

        if (response.data.count === 0){
            console.warn("No any students associate with this course.")
        }

        console.log("Enrolled details | ", response.data.data)
        return response.data;
    } 
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to fetch enrolled students"

        throw new Error(message);
    }
}