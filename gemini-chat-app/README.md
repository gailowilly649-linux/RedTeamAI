# ✨ Gemini AI Chat Web Application (gemini-3.6-flash)

A full-stack AI chat web application built with **React (Vite)**, **Node.js (Express)**, and Google's official **`@google/genai`** SDK powered by `gemini-3.6-flash`.

---

## 🏗 Architecture & Security

- **Frontend**: Single Page Application built with React + Vite + Tailwind CSS.
- **Backend Proxy**: Express server on port `5000`. The frontend **never** accesses the Gemini API directly. All requests pass through the backend proxy.
- **API Key Security**: The `GEMINI_API_KEY` is loaded strictly on the backend from `server/.env`.

---

## 🚀 Quick Setup & Local Execution

### Prerequisites
- **Node.js**: v18.0.0 or newer
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### 📦 Installation

#### Option 1: One-Command Installation (Root)

```bash
# Clone or navigate to project directory
cd gemini-chat-app

# Install dependencies across root, server, and client
npm run install:all
```

#### Option 2: Manual Installation per Folder

```bash
# 1. Install Root dev dependencies
npm install

# 2. Install Backend dependencies
cd server && npm install && cd ..

# 3. Install Frontend dependencies
cd client && npm install && cd ..
```

---

### 🔑 Environment Configuration

1. Create a `.env` file inside the `server/` directory:
   ```bash
   cp server/.env.example server/.env
   ```
2. Open `server/.env` and paste your Gemini API key:
   ```env
   GEMINI_API_KEY=AIzaSyYourActualGeminiApiKeyHere
   PORT=5000
   FRONTEND_ORIGIN=http://localhost:5173
   ```

---

### 💻 Running the App Locally

#### macOS / Linux (zsh / bash)

```bash
# Run both Frontend & Backend concurrently from project root:
npm run dev

# Alternatively, run them in separate terminal windows:
# Terminal 1 (Backend):
cd server && npm run dev

# Terminal 2 (Frontend):
cd client && npm run dev
```

#### Windows (PowerShell / Command Prompt)

```powershell
# Run both Frontend & Backend concurrently from project root:
npm run dev

# Alternatively, run them in separate PowerShell windows:
# Window 1 (Backend):
cd server; npm run dev

# Window 2 (Frontend):
cd client; npm run dev
```

Once running, open your browser to **`http://localhost:5173`**.

---

## 🛠 API Endpoint Reference

### POST `/api/chat`

**Request Body**:
```json
{
  "conversationId": "chat-12345",
  "messages": [
    { "role": "user", "content": "What is the capital of France?" }
  ]
}
```

**Response Body**:
```json
{
  "conversationId": "chat-12345",
  "reply": "The capital of France is Paris."
}
```
