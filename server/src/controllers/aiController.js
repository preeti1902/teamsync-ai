const { callOpenAI } = require('../services/aiService');

exports.detectIntent = async (req, res) => {
  try {
    const prompt = `Classify the intent of the following message in one word (assign_task, request_review, set_deadline, none): "${req.body.text}"`;
    const intent = await callOpenAI(prompt);
    res.json({ intent: intent.trim() });
  } catch (err) {
    res.status(500).json({ error: 'AI processing failed' });
  }
};

exports.summarize = async (req, res) => {
  try {
    const prompt = `Summarize this text concisely: "${req.body.text}"`;
    const summary = await callOpenAI(prompt);
    res.json({ summary: summary.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Summary failed' });
  }
};
