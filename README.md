# 🤖 TeamSync AI – Real-Time Collaborative Workspace with AI
TeamSync AI is a modern MERN-based real-time collaboration platform featuring AI-powered intent detection and automated summarization. Teams can co-edit documents, chat, and track tasks—faster and smarter—with robust role-based permissions.

## 🚀 Features
- Secure JWT Authentication (Login, Signup, Logout; HTTP-only cookies)
- Role-based access (Admin, Editor, Viewer)
- Workspace and document management
- Real-time collaborative document editing (Socket.IO)
- Real-time team chat with live updates
- AI-powered intent recognition & message summarization (OpenAI API)
- Task assignment and goal tracking
- Responsive, clean UI
- Input/output sanitization for security
- AI result caching and rate limiting for performance/cost

## 🛠️ Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/teamsync-ai.git
    cd teamsync-ai
    ```

2. **Backend Setup:**
    ```bash
    cd server
    npm install
    # Copy .env.example to .env and fill in MONGO_URI, JWT_SECRET, OPENAI_API_KEY, etc.
    npm start
    ```

3. **Frontend Setup (in another terminal):**
    ```bash
    cd client
    npm install
    npm start
    ```

4. **Open your browser and visit:**  
    http://localhost:3000

## ⚙️ Technologies Used
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.IO, JWT, OpenAI API
- **Frontend:** React, Context API, Socket.IO Client, Axios, DOMPurify
- **Authentication:** Secure JWT in HTTP-only cookies
- **AI:** OpenAI GPT (intent detection & summarization), prompt caching
- **Other:** Bcrypt, dotenv, NodeCache

## 🤝 Contributing
We welcome contributions! Feel free to open issues or submit pull requests.

## 📁 Project Structure
```
TeamSyncAI/
│-- client/                      
│   │-- src/
│   │   │-- api/
│   │   │   │-- aiService.js
│   │   │   │-- authService.js
│   │   │-- components/
│   │   │   │-- Auth/
│   │   │   │-- Chat/
│   │   │   │-- Workspace/
│   │   │   │-- AI/
│   │   │-- context/
│   │   │   │-- AuthContext.js
│   │   │-- hooks/
│   │   │   │-- useSocket.js
│   │   │-- utils/
│   │   │   │-- sanitize.js
│   │   │-- App.js
│   │   │-- index.js
│   │   │-- styles/
│   │       │-- main.css
│   │-- public/
│   │-- package.json
│
│-- server/
│   │-- src/
│   │   │-- controllers/
│   │   │   │-- aiController.js
│   │   │   │-- authController.js
│   │   │   │-- workspaceController.js
│   │   │   │-- documentController.js
│   │   │   │-- chatController.js
│   │   │-- middleware/
│   │   │   │-- auth.js
│   │   │   │-- authorize.js
│   │   │   │-- sanitize.js
│   │   │-- models/
│   │   │   │-- User.js
│   │   │   │-- Workspace.js
│   │   │   │-- Document.js
│   │   │   │-- Chat.js
│   │   │-- services/
│   │   │   │-- aiService.js
│   │   │   │-- socketService.js
│   │   │-- routes/
│   │   │   │-- aiRoutes.js
│   │   │   │-- authRoutes.js
│   │   │   │-- workspaceRoutes.js
│   │   │   │-- documentRoutes.js
│   │   │   │-- chatRoutes.js
│   │   │-- config/
│   │   │   │-- db.js
│   │   │-- app.js
│   │   │-- index.js
│   │-- .env
│   │-- package.json
│
│-- .env.example                 
│-- README.md                    
```
---

**Enjoy working with TeamSync AI!**
