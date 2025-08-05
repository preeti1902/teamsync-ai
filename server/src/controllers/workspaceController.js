const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
  try {
    const workspace = new Workspace({
      name: req.body.name,
      description: req.body.description,
      members: [{ user: req.user.id, role: 'admin' }]
    });
    await workspace.save();
    res.status(201).json(workspace);
  } catch {
    res.status(500).json({ error: 'Workspace creation failed' });
  }
};

exports.listWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ 'members.user': req.user.id });
    res.json(workspaces);
  } catch {
    res.status(500).json({ error: 'Failed to list workspaces' });
  }
};

exports.getWorkspace = async (req, res) => {
  try {
    const ws = await Workspace.findById(req.params.id);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    // Check if user is member
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(ws);
  } catch {
    res.status(500).json({ error: 'Failed to get workspace' });
  }
};
