const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const summarizeText = async (text) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Please summarize the following text:\n\n${text}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();
    } catch (error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
};

const askQuestion = async (question) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent(question);
        const response = await result.response;

        return response.text();
    } catch (error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
};

module.exports = {
    summarizeText,
    askQuestion
};
