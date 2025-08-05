const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const sanitize = require('../middleware/sanitize');
const chatController = require('../controllers/chatController');

// Get chat history (all can view)
router.get('/:workspaceId', auth, authorize(['admin', 'editor', 'viewer']), chatController.getChatHistory);

// Send chat message: Only admin, editor (not viewer)
router.post('/:workspaceId', auth, authorize(['admin', 'editor']), sanitize, chatController.sendMessage);

// Delete chat message: (admin/editor)
router.delete(
  '/:workspaceId/:messageId',
  auth,
  authorize(['admin', 'editor']), 
  chatController.deleteMessage
);

module.exports = router;
