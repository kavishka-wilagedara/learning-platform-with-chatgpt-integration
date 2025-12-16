const { getCourseRecommendations } = require("../services/openaiService");
const { getAllPublishCourses } = require("../services/getAllPublishCourses")

const getRecommendations = async(req, res) => {

    const { userPrompt } = req.body;

    if( !userPrompt ){
        return res.status(400).json({ 
            success: false,
            message: "Prompt is required" 
        });
    }

    try{

        const publishedCourses = await getAllPublishCourses()

        if ( publishedCourses.length === 0){
            return res.status(400).json({ 
                success: false,
                message: "No available courses at this moment" 
            });
        }

        const recommendations = await getCourseRecommendations(userPrompt, publishedCourses)
        res.status(200).json({ 
            success: true,
            recommendations 
        });
    }

    catch (error) {
        console.error("Error fetching recommendations: ", error)

        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

module.exports = { getRecommendations };