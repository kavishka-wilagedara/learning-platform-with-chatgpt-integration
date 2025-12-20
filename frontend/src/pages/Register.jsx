import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { registerUser } from '../services/AuthService'
import toast from 'react-hot-toast';

const Register = () => {

  const [form, setForm] = useState({
    "firstname": "",
    "lastname": "",
    "username": "",
    "passowrd": "",
    "role": "student"
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
        const newUser = await registerUser(form)
        login(newUser)

        toast.success("Registration successfull")
        if(newUser.role == "student"){
            navigate("/courses")
        }
        else{
            navigate("/all")
        }
    }
    catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-linear-to-r from-blue-500 via-purple-500 to-indigo-500'>
        <form
            onSubmit={handleSubmit}
            className='bg-white p-10 rounded shadow-md w-full max-w-lg'
        >
            <h2 className="text-2xl text-purple-500 font-bold text-center">
                Welcome to E-Learning Platform,
            </h2>
            <p className='text-gray-500 text-center mt-2'>
                Create your account to get ultimate experiance
            </p>

            <input
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                className="w-50 p-2 border rounded mb-4 mt-8"
                required
            />

            <input
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-50 p-2 border rounded mb-4 ml-8"
                required
            />

            <select
                name="role"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
            >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
            </select>

            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                required
            />

            <input
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                required
            />

            <button
                    disabled={loading}
                    className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white text-xl font-semibold p-3 rounded"
            >
                {loading ? "Processing..." : "Register"}
            </button>
        </form>
    </div>
  )
}

export default Register