const { default: OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getCourseRecommendations = async (userPrompt, courses) => {
  try {

    const coursesList = courses
      .map(
        (course, index) =>
          `${index + 1}. Title: ${course.title}\nDescription: ${course.description}\nContent: ${course.content}`
      )
      .join("\n\n");

    const response = await openai.chat.completions.create({
      model: "gpt-3",
      messages: [
        {
          role: "system",
          content:
            "You are an educational assistant that recommends courses based on student goals.",
        },
        {
          role: "user",
          content: `
Student goal: "${userPrompt}"

Available courses:
${coursesList}

Recommend 5–8 best matching courses with short reasons.
Format:
1. Course title - Reason
          `,
        },
      ],
      temperature: 0.7,
      max_tokens: 20,
    });

    return response.choices[0].message.content;
  }
  catch (error) {
    console.error("GPT API Error:", error.message);
    throw new Error("Could not fetch recommendations from GPT.");
  }
};

module.exports = { getCourseRecommendations };
