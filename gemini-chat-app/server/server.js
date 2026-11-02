import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// CORS configuration — restricted strictly to frontend origin
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

// Mount chat route
app.use('/api', chatRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Gemini Express Proxy Backend' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Gemini Backend Proxy running on http://localhost:${PORT}`);
  console.log(`🔒 CORS origin allowed: ${FRONTEND_ORIGIN}\n`);
});
