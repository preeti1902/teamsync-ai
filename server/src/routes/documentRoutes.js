const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const sanitize = require('../middleware/sanitize');
const documentController = require('../controllers/documentController');

// View documents: All (admin, editor, viewer)
router.get('/:workspaceId', auth, authorize(['admin', 'editor', 'viewer']), documentController.listDocuments);
router.get('/single/:id', auth, authorize(['admin', 'editor', 'viewer']), documentController.getDocument);

// Create/edit documents: Only admin, editor
router.post('/', auth, authorize(['admin', 'editor']), sanitize, documentController.createDocument);
router.put('/:id', auth, authorize(['admin', 'editor']), sanitize, documentController.updateDocument);

// Delete document: Only admin
router.delete('/:id', auth, authorize(['admin']), documentController.deleteDocument);

module.exports = router;
