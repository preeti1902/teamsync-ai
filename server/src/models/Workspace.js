const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
