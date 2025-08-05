const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const workspaceController = require('../controllers/workspaceController');

// Admin only route
router.delete('/:id', auth, authorize(['admin']), workspaceController.deleteWorkspace);

// Editors & Admins can create or edit:
router.post('/', auth, authorize(['admin', 'editor']), workspaceController.createWorkspace);

// Viewers can only view (no create or edit routes exposed to them)
// For example GET workspace details for all roles with auth:
router.get('/:id', auth, authorize(['admin', 'editor', 'viewer']), workspaceController.getWorkspace);

module.exports = router;
