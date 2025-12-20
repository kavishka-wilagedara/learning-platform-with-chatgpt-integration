import React, { useEffect, useState } from "react"
import { 
    getAllInstructorCourses, 
    deleteCourse, 
    updateCourse,
    getEnrolledStudents
} from "../services/InstructorService"
import toast from "react-hot-toast"

const InstructorCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCourse, setEditingCourse] = useState(null)
    const [editPayload, setEditPayload] = useState({ 
        title: "", 
        description: "", 
        content: "", 
        isPublished: "false" 
    })
    const [selectedEnrollments, setSelectedEnrollments] = useState(null)

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
            title: course.title ?? "",
            description: course.description ?? "",
            content: course.content ?? "",
            isPublished: Boolean(course.isPublished),
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

            const payload = {};

            Object.entries(editPayload).forEach(([key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    payload[key] = value;
                }
            });

            const res = await updateCourse(editingCourse, editPayload)
            setCourses((prev) =>
            prev.map((c) => (c._id === editingCourse ? {...c, ...res.data} : c)))   
            setEditingCourse(null);
            toast.success(res.message);
        } 
        catch (error) {
            toast.error(error.message);
        }
    };

    const viewEnrollments = async(course) => {

        console.log("Course Id: ", course._id)
        try{
            
            const enrolledStudents = await getEnrolledStudents(course._id)

            console.log("Enrolled Student: ", enrolledStudents)
            setSelectedEnrollments({
                courseTitle: course.title,
                enrolledCount: enrolledStudents.length,
                data: enrolledStudents.data
            })

            if(enrolledStudents.count === 0){
                toast("No students enroll with this course module")
            }
        }
        catch (error) {
            toast.error(error.message);
        }

    }

    const closeEnrollments = () => {setSelectedEnrollments(null)}

    if (loading) return <p>Loading courses...</p>;

    return (
        
        <div className="p-6">
            {/* Headline */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    My Courses
                </h1>
                <p className="text-gray-500 mt-2">
                    Manage your posted courses below. Edit, delete or publish as needed & View enrollments.
                </p>
            </div>

            {/* Courses section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-xl">
                        {editingCourse === course._id ? (
                            <div className="flex flex-col gap-3">

                                <input
                                    type="text"
                                    name="title"
                                    value={editPayload.title}
                                    onChange={handleEditChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                                />

                                <textarea
                                    name="description"
                                    value={editPayload.description}
                                    onChange={handleEditChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                                />

                                <textarea
                                    name="content"
                                    value={editPayload.content}
                                    onChange={handleEditChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                                />

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={editPayload.isPublished}
                                        onChange={handleEditChange}
                                        className="accent-blue-500"
                                    />

                                    Published
                                </label>

                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={submitEdit}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingCourse(null)}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>

                                <p className="text-gray-600 mt-2">
                                    <b>About:</b> {course.description}</p>
                                <p className="text-gray-600 mt-2">
                                    <b>Content:</b> {course.content}
                                </p>

                                <div className="flex justify-between items-center mt-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            course.isPublished
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-500 text-white"
                                        }`}
                                    >       
                                        {course.isPublished ? "Published" : "Draft"}
                                    </span>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => viewEnrollments(course)}
                                            className="text-orange-800 hover:underline"
                                        >
                                            View
                                        </button>
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
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Enrolled student table */}
            {selectedEnrollments && (
                <div className="fixed inset-0 flex items-center justify-center z-100">
                    <div 
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
                        onClick={closeEnrollments}>
                    </div>

                    {/* Table */}
                    <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 z-50">
                        <h2 className="text-2xl font-bold mb-4">{selectedEnrollments.courseTitle} - Enrollments</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">First Name</th>
                                    <th className="border p-2">Last Name</th>
                                    <th className="border p-2">Enrollment Times</th>
                                    <th className="border p-2">Enrollment Date</th>
                                    <th className="border p-2">Update Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEnrollments.data.map((e, idx) => (
                                    <tr key={idx} className="even:bg-gray-50">
                                        <td className="border p-2">{e.student?.firstname || "-"}</td>
                                        <td className="border p-2">{e.student?.lastname || "-"}</td>
                                        <td className="border p-2">{e.enrollmentDetails?.enrollmentCount || "-"}</td>
                                        <td className="border p-2">{e.enrollmentDetails?.firstEnrolledDate || "-"}</td>
                                        <td className="border p-2">{e.enrollmentDetails?.lastEnrollmentDate || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={closeEnrollments}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorCourses;
