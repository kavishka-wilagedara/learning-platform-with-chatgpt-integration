const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
      5. If a match exists, provide:
         Course: [Title]
         Reason: [One sentence explaining the professional connection]

      REJECTION EXAMPLES:
      - Goal: "Farmer" vs Course: "Math" -> REJECT (Not direct)
      - Goal: "Chef" vs Course: "Chemistry" -> REJECT (Too abstract)
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    if (responseText.includes("NO_DIRECT_MATCH")) {
      return "We currently don't have any courses directly related to your request. Check our catalog for general business or science courses!";
    }

    console.log("Response Text: ", responseText)
    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Could not fetch recommendations.");
  }
};

module.exports = { getCourseRecommendations };
