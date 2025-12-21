const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getCourseRecommendations = async (userPrompt, courses) => {
  try {
    const coursesList = courses
      .map((c, i) => `Title: ${c.title}\nDescription: ${c.description}`)
      .join("\n\n");

    console.log("Course list: ", coursesList)

    const prompt = `
      CONTEXT: You are a strict academic advisor.
      USER GOAL: "${userPrompt}"
      
      AVAILABLE COURSES:
      ${coursesList}

      INSTRUCTIONS (FOLLOW RIGIDLY):
      1. CRITICAL: Evaluate if any course is DIRECTLY related to the User Goal.
      2. If multiple courses match, suggest up to 3.
      3. If a course is only vaguely related (e.g., "Statistics" for a "Farmer"), REJECT IT.
      4. If NO course is a professional match for the goal, return ONLY the word: "NO_DIRECT_MATCH".
      5. If matches exist, return ONLY a valid JSON ARRAY.
      6. DO NOT include markdown, comments, explanations, or extra text.
      7. JSON format MUST be exactly:

      [
        {
          "course": "Course Title",
          "reason": "One clear professional reason"
        }
      ]

      REJECTION EXAMPLES:
      - Goal: "Farmer" vs Course: "Math" -> REJECT (Not direct)
      - Goal: "Chef" vs Course: "Chemistry" -> REJECT (Too abstract)

      IMPORTANT:
      - Response must be valid JSON.
      - No trailing commas.
      - No extra keys.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    if (responseText.includes("NO_DIRECT_MATCH")) {
      return [{
        course: "No Recommendations",
        reason: "No recommendation courses for your request"
      }]
    }

    console.log("Response Text: ", responseText)
    return responseText;
  } catch (error) {

    if (error.status === 429 || error.message.includes("quota")) {
      console.error("Gemini quota exceeded");
      return [{
        course: "AI Temporarily Unavailable",
        reason: "AI recommendation limit exceeded. Please try later."
      }];
    }
    
    console.error("Gemini API Error:", error.message);
    throw new Error("Could not fetch recommendations.");
  }
};

module.exports = { getCourseRecommendations };
