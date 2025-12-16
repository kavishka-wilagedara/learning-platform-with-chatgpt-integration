import React, { useState } from "react"
import toast from "react-hot-toast"
import { openAiRecommendations } from "../services/OpenAiService"

const OpenAiRecommend = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState("")

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    try {
      setLoading(true)
      setRecommendations("")

      const result = await openAiRecommendations(prompt)
      setRecommendations(result)

      toast.success("Recommendations generated!")
    } 
    catch (error) {
      toast.error(error.message)
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Add your prompt</h1>

      <input
        type="text"
        placeholder="Ex: I want to be a Java Developer"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-2/3 p-4 border rounded mt-8"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white text-lg font-semibold mt-6 py-2 px-5 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {recommendations && (
        <>
          <h1 className="text-3xl font-bold mt-10">
            Suggested Courses by OpenAI
          </h1>

          <div className="w-2/3 p-6 border rounded mt-6 whitespace-pre-line bg-gray-50">
            {recommendations}
          </div>
        </>
      )}
    </div>
  );
};

export default OpenAiRecommend;
