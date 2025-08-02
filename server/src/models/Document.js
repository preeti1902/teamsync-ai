const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
