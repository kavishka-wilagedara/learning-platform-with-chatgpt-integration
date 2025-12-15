import axios from "axios";

const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

export const loginUser = async(credentials) => {

    try{
        const response = await axios.post(
            `${backendApiUrl}/auth/login`,
            credentials
        )

        // Store the token 
        localStorage.setItem("token", response.data.token)
        console.log("Token: ", response.data.token)

        return response.data.user
    }
    catch(error){
        // Set backend error
        const message = 
            error.response?.data?.message ||
            error.message ||
            "Login failed";

        throw new Error(message);
    }
}