import React, { useState } from "react"
import toast from "react-hot-toast"
import { openAiRecommendations } from "../services/OpenAiService"
import { useNavigate } from 'react-router-dom'

const OpenAiRecommend = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const navigate = useNavigate()
  
  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    try {
      setLoading(true)
      setRecommendations("")

      const result = await openAiRecommendations(prompt)
      const parsedResult = typeof result === "string" ? JSON.parse(result) : result;
      setRecommendations(parsedResult);

      toast.success("Recommendations generated!")
    } 
    catch (error) {
      toast.error(error.message)
    } 
    finally {
      setLoading(false);
    }
  }

  const navigateCourses = () => {
    navigate('/courses')
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          AI Course Recommendation
        </h1>
        <p className="text-gray-500 mt-2">
          Tell us your career goal and get personalized course suggestions
        </p>
      </div>

      <div className="mt-10 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-semibold text-gray-700">
          Your Career Goal
        </label>

        <input
          type="text"
          placeholder="Ex: I want to be a Java Developer"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl mt-8 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-2xl transition"
        >
        {loading ? "Thinking..." : "Get Recommendations"}
      </button>

      {recommendations && recommendations.length > 0 && (
        <div className="mt-12 w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl animate-bounce">🤖</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
              Suggested Courses
            </h2>
          </div>

          {/* Recommendations list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex flex-col h-full bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {rec.course}
                </h3>
                <p className="text-gray-600">{rec.reason}</p>
                <button
                  onClick={navigateCourses}
                  className="mt-auto self-end text-blue-600 hover:underline"
                >
                  view courses
                </button>
              </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default OpenAiRecommend;
