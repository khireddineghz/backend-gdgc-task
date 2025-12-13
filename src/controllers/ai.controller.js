const geminiService = require('../services/gemini.service');
const dataService = require('../services/data.service');

const summarizeText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const summary = await geminiService.summarizeText(text);

        res.json({
            summary,
            originalLength: text.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const answer = await geminiService.askQuestion(question);

        res.json({
            question,
            answer,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const analyzeItem = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Item ID is required' });
        }

        const item = await dataService.getItemById(id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const itemDescription = `Analyze this item: ${JSON.stringify(item, null, 2)}`;
        const analysis = await geminiService.askQuestion(itemDescription);

        res.json({
            item,
            analysis,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    summarizeText,
    askQuestion,
    analyzeItem
};
