import React from 'react'
import { PiBookOpenTextThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700">

            {/* Title section */}
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-5xl md:text-6xl font-bold mt-15 bg-clip-text text-white'>
                    Online Learning Platform 
                </h1>
                <p className='text-2xl text-gray-300 mt-4'>
                    Discover courses from Beginner to Master level – Skillful & Professional Instructors
                </p>
            </div>

            {/* Image section */}
            <div className='flex flex-col items-center justify-center'>
                <PiBookOpenTextThin className='w-150 h-80 text-white'/>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-8 mt-10">
                <button 
                    onClick={() => navigate("/login")}
                    className="bg-white text-blue-500 font-bold py-3 px-5 rounded-lg hover:bg-gray-300"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-600 text-white font-bold py-3 px-3 rounded-lg hover:bg-blue-700"
                >
                    Join Now
                </button>
            </div>
        </div>
  )
}

export default Home