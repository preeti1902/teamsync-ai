const Chat = require('../models/Chat');
const Workspace = require('../models/Workspace');

// Get chat history for a workspace (any member)
exports.getChatHistory = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    // Check workspace membership
    const ws = await Workspace.findById(workspaceId);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }

    const messages = await Chat.find({ workspace: workspaceId }).populate('user', 'username role');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

// Send a chat message (admin/editor only, viewer blocked by route middleware)
exports.sendMessage = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { message } = req.body;
    // Check workspace membership
    const ws = await Workspace.findById(workspaceId);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }
    // Save new chat
    const newMsg = new Chat({
      workspace: workspaceId,
      user: req.user.id,
      message
    });
    await newMsg.save();
    // Optionally: emit to socket.io here
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Delete a chat message (admin only, or admin/editor if desired)
exports.deleteMessage = async (req, res) => {
  try {
    const { workspaceId, messageId } = req.params;
    // Validate workspace membership
    const ws = await Workspace.findById(workspaceId);
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (!ws.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ error: 'Not a workspace member' });
    }

    const chatMsg = await Chat.findById(messageId);
    if (!chatMsg) return res.status(404).json({ error: 'Message not found' });

    // Only let admin, or the sender themselves, delete
    // If only allow sender or admin:
    if (req.user.role !== 'admin' && chatMsg.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only the sender or admin can delete this message' });
    }

    await chatMsg.remove();
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
