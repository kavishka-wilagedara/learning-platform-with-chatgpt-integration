import axios from "axios";
import { authHeader } from "./AuthService"

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

export const openAiRecommendations = async(prompt) => {

    try{
        const response = await axios.post(
            `${backendApiUrl}/recommend/find`,
            { userPrompt: prompt },
            { headers: authHeader() }
        )
    
        return response.data.recommendations
    } 
    catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to get recommendations"

        throw new Error(message)
    }
}