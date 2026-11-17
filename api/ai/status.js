// api/ai/status.js - Vercel Serverless Function for AI Healthcheck
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: "ONLINE",
    provider: "Google Gemini AI",
    totalKeysConfigured: 3,
    environment: process.env.VERCEL ? "VERCEL_SERVERLESS" : "LOCAL"
  });
}
