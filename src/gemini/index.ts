import { GoogleGenAI } from "@google/genai";

const gemai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default gemai