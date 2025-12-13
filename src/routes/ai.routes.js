const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/summarize', aiController.summarizeText);
router.post('/ask', aiController.askQuestion);
router.post('/analyze-item', aiController.analyzeItem);

module.exports = router;
