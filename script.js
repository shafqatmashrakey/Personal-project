require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');
const readline = require('readline');

const apiKey = process.env.OPENAI_API_KEY; // Fetch the API key from the environment
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askAI(question) {
  try {
    const response = await axios.post(apiUrl, {
      model: "gpt-3.5-turbo", // Use the correct model name
      messages: [{ role: "user", content: question }],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const aiResponse = response.data.choices[0].message.content;
    console.log("AI Response:", aiResponse);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close(); // Close the readline interface
  }
}

// Ask the user for input
rl.question("Ask the AI a question: ", (question) => {
  askAI(question);
});