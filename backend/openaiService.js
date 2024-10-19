const fetch = require("node-fetch");

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getAIResponse = async (description) => {
  const response = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: description,
        max_tokens: 100,
        // You can add other parameters as needed
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching AI response");
  }

  const data = await response.json();
  return data.choices[0].text; // Adjust based on the response format
};
