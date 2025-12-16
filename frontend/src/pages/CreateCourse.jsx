import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewCourse } from '../services/InstructorService'
import toast from 'react-hot-toast'

const CreateCourse = () => {

    const [form, setForm] = useState({
        "title": "",
        "description": "",
        "content": "",
        "isPublished": true
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const newCourse = await createNewCourse(form)

            console.log("New course: ", newCourse)
            toast.success("Course creation successfull")
            navigate("/all") // Navigate to all posted courses page
        }
        catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex items-baseline justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded shadow w-full max-w-lg mt-10"
            >
                <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Course Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <textarea
                    name="content"
                    placeholder="Course Content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <label className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={form.isPublished}
                        onChange={handleChange}
                    />
                    Publish immediately
                </label>

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
                >
                    {loading ? "Creating..." : "Create Course"}
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
