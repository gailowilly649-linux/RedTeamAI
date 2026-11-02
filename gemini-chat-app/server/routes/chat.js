import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({
        error: 'Backend Configuration Error',
        message: 'GEMINI_API_KEY is not set in backend server environment (.env).'
      });
    }

    const { messages, conversationId } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a non-empty "messages" array.'
      });
    }

    // Initialize the official Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    // Format conversation history for Gemini API
    // Roles in Gemini API: 'user' for user, 'model' for assistant/bot
    const formattedContents = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Call Gemini API using gemini-3.6-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents
    });

    const replyText = response.text || 'No response generated.';

    return res.json({
      conversationId: conversationId || null,
      reply: replyText
    });

  } catch (error) {
    console.error('Gemini API Express Route Error:', error);

    const statusCode = error.status || error.statusCode || 500;
    const errorMessage = error.message || 'An unexpected error occurred on the backend server.';

    if (statusCode === 401 || statusCode === 403) {
      return res.status(statusCode).json({
        error: 'Authentication Error',
        message: 'Invalid or missing Gemini API key. Please check GEMINI_API_KEY in server/.env.'
      });
    }

    if (statusCode === 429) {
      return res.status(429).json({
        error: 'Rate Limit Exceeded',
        message: 'Gemini API rate limit reached. Please wait a moment and try again.'
      });
    }

    return res.status(statusCode).json({
      error: 'Backend Server Error',
      message: errorMessage
    });
  }
});

export default router;
