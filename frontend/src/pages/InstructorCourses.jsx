import React, { useEffect, useState } from "react"
import { getAllInstructorCourses, deleteCourse, updateCourse } from "../services/InstructorService"
import toast from "react-hot-toast"

const InstructorCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCourse, setEditingCourse] = useState(null)
    const [editPayload, setEditPayload] = useState({ 
        title: "", 
        description: "", 
        content: "", 
        isPublished: false 
    });

    useEffect(() => {
        const fetchCourses = async () => {  
            try {
                const coursesInstructor = await getAllInstructorCourses()
                console.log("Course posted by Instructor: ", coursesInstructor)
                setCourses(coursesInstructor)
            } 
            catch (error) {
                toast.error(error.message)
            } 
            finally {
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return
        try {
            await deleteCourse(courseId);
            setCourses((prev) => prev.filter((c) => c._id !== courseId))
            toast.success("Course deleted successfully!")
        } 
        catch (error) {
            toast.error(error.message)
        }
    };

    const startEdit = (course) => {
        setEditingCourse(course._id)
        setEditPayload({
            title: course.title,
            description: course.description,
            content: course.content,
            isPublished: course.isPublished
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target
        setEditPayload((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const submitEdit = async () => {
        try {
            const res = await updateCourse(editingCourse, editPayload)
            setCourses((prev) =>
            prev.map((c) => (c._id === editingCourse ? res.data : c)))   
            setEditingCourse(null);
            toast.success(res.message);
        } 
        catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) return <p>Loading courses...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
                <div key={course._id} className="border rounded p-4 shadow">
                    {editingCourse === course._id ? (
                        <div className="flex flex-col gap-2">

                            <input
                                type="text"
                                name="title"
                                value={editPayload.title}
                                onChange={handleEditChange}
                                className="border p-2 rounded"
                            />

                            <textarea
                                name="description"
                                value={editPayload.description}
                                onChange={handleEditChange}
                                className="border p-2 rounded"
                            />

                            <textarea
                            name="content"
                            value={editPayload.content}
                            onChange={handleEditChange}
                            className="border p-2 rounded"
                            />

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={editPayload.isPublished}
                                    onChange={handleEditChange}
                                />

                                Published
                            </label>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={submitEdit}
                                    className="bg-green-500 text-white px-4 py-1 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingCourse(null)}
                                    className="bg-gray-300 px-4 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <p className="text-gray-600">{course.description}</p>
                            <p className="text-gray-600">
                                <b>Content:</b> {course.content}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <span
                                    className={`px-3 py-1 rounded text-sm ${
                                        course.isPublished
                                            ? "bg-green-500 text-white"
                                            : "bg-yellow-500 text-white"
                                    }`}
                                >       
                                    {course.isPublished ? "Published" : "Draft"}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(course)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InstructorCourses;
