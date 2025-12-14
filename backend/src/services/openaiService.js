const { default: OpenAI } = require("openai");

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
})

const getCourseRecommendations = async (userPrompt, courses) => {
  try {

    const coursesList = courses.map((course, index) =>
        `${index + 1}. Title: ${course.title}\nDescription: ${course.description}\nContent: ${course.content}`
    ).join("\n\n");

    const prompt = `
        You are an educational assistant. A student asked: "${userPrompt}".
        Here is a list of available courses:

        ${coursesList}

        Suggest 5-8 courses from the above list that best match the student's goal.
        For each suggested course, provide:
        1. Course title
        2. A short reason why this course is recommended.

        Format your response like this:

        1. <Course Title> - <Reason>
        2. <Course Title> - <Reason>

        If none of the courses match the goal, respond with: 
        "No courses available at the moment that match your request."

    ...
    `;

    const response = await openai.completions.create({
        model: "gpt-4",
        prompt,
        max_tokens: 20,
        temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } 
  catch (error) {
    console.error("GPT API Error:", error.message);
    throw new Error("Could not fetch recommendations from GPT.");
  }
};

module.exports = { getCourseRecommendations };
