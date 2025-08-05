const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes');
// const aiRoutes = require('./routes/aiRoutes');
// const workspaceRoutes = require('./routes/workspaceRoutes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Setting up routes
// app.use('/api/auth', authRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/workspace', workspaceRoutes);

// Testing the server
app.get('/', (req, res) => {
  res.send('TeamSyncAI Backend Running');
});

module.exports = app;
