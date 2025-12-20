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
        <div className="flex items-baseline justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 w-full max-w-2xl border border-gray-100"
            >
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Create Course</h2>
                    <p className="text-gray-500 mt-2">Fill in the details to launch your new teaching path.</p>
                </div>

                <div className='space-y-5'>
                    <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                    required
                    />

                    <textarea
                        name="description"
                        rows={2}
                        placeholder="Course Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                        required
                    />

                    <textarea
                        name="content"
                        rows={4}
                        placeholder="Course Content"
                        value={form.content}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200"
                        required
                    />

                    <label className="flex items-center gap-5 p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={form.isPublished}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="font-semibold text-gray-800">
                                Publish immediately
                            </span>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Make this course visible to students right away
                            </p>
                        </div>
                    </label>

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-4 text-xl rounded-xl font-semibold"
                >
                    {loading ? "Creating..." : "Create Course"}
                </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
