const express = require('express');
const router = express.Router();
const { detectIntent, summarize } = require('../controllers/aiController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const sanitize = require('../middleware/sanitize');

// AI features: all users who are authenticated and workspace members
router.post('/intent', auth, authorize(['admin', 'editor', 'viewer']), sanitize, detectIntent);
router.post('/summarize', auth, authorize(['admin', 'editor', 'viewer']), sanitize, summarize);

module.exports = router;
