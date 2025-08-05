const Document = require('../models/Document');
const Workspace = require('../models/Workspace');

// List all documents in a workspace (user must be workspace member)
exports.listDocuments = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    // Optional: Check if user is a workspace member
    const ws = await Workspace.findById(workspaceId);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }
    const docs = await Document.find({ workspace: workspaceId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list documents' });
  }
};

// Get a single document (user must be workspace member)
exports.getDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    // Check membership
    const ws = await Workspace.findById(doc.workspace);
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};

// Create a new document (admin/editor only, enforced by middleware)
exports.createDocument = async (req, res) => {
  try {
    const { workspace, title, content } = req.body;
    // Optional: verify workspace membership
    const ws = await Workspace.findById(workspace);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }
    const doc = new Document({ workspace, title, content });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Document creation failed' });
  }
};

// Update a document content/title (admin/editor only)
exports.updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    // Optional: membership check
    const ws = await Workspace.findById(doc.workspace);
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }

    const { content, title } = req.body;
    if (typeof content === 'string') doc.content = content;
    if (typeof title === 'string') doc.title = title;
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update document' });
  }
};

// Delete a document (admin only, enforced by middleware)
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    await doc.remove();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
