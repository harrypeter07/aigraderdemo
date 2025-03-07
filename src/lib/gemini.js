// lib/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genai.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function analyzeSentiment(text) {
  const prompt = `Analyze the sentiment of this text and return: Confidence (0-1), Tone (positive/neutral/negative). Format as JSON:\n${text}`;
  const result = await model.generateContent(prompt);
  const json = JSON.parse(result.response.text());
  return { confidence: json.confidence, tone: json.tone };
}

export async function gradeAssignment(studentText, modelText = null) {
  const prompt = modelText
    ? `Compare the student's answer with the model answer and provide:\n1. Score (0-100)\n2. Feedback (HTML formatted)\nModel Answer:\n${modelText}\nStudent Answer:\n${studentText}`
    : `Grade this student answer based on understanding (40%), clarity (30%), evidence (30%):\n1. Score (0-100)\n2. Feedback (HTML formatted)\nStudent Answer:\n${studentText}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const scoreMatch = text.match(/Score: (\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  const feedback = text.replace(/Score: \d+/, '').trim();
  const sentiment = await analyzeSentiment(studentText);

  return { score, feedback, sentiment };
}