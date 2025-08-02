const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed password
  role: {
    type: String,
    enum: ['Project Lead', 'Developer', 'viewer'],
    default: 'viewer'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
