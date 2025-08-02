const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
let lastCallTimestamp = 0;
const RATE_LIMIT_MS = 1000; // minimum delay between calls

async function callOpenAI(prompt) {
  const now = Date.now();
  if (now - lastCallTimestamp < RATE_LIMIT_MS) {
    throw new Error('Rate limit exceeded, please slow down');
  }
  lastCallTimestamp = now;

  if (cache.has(prompt)) return cache.get(prompt);

  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    const content = res.data.choices?.[0]?.message?.content || 'No response';
    cache.set(prompt, content);
    return content;
  } catch (error) {
    // Simple retry once after delay
    await new Promise(r => setTimeout(r, 500));
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    const content = res.data.choices?.[0]?.message?.content || 'No response';
    cache.set(prompt, content);
    return content;
  }
}

module.exports = { callOpenAI };
