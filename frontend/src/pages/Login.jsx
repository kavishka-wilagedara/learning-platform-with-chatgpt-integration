import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/AuthService';
import toast from 'react-hot-toast';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const user = await loginUser({ username, password })
            login(user)

            toast.success("Login successfull")
            navigate("/courses")
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
                className='bg-white p-8 rounded shadow-md w-full max-w-md'
            >
                <h2 className="text-2xl text-purple-500 font-bold text-center">
                    Welcome Back,
                </h2>
                <p className='text-gray-500 text-center mt-2'>
                    Sign in to your account to continue learning
                </p>
            
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4 mt-8"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white text-xl font-semibold p-3 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login