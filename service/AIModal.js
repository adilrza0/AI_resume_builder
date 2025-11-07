// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  export const isAIConfigured = Boolean(apiKey);
  
  const genAI = new GoogleGenerativeAI(apiKey || "");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 0.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  };
  
  export const AIChatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  
  export async function sendMessageWithHandling(prompt) {
    if (!isAIConfigured) {
      const err = new Error("AI not configured: missing VITE_GOOGLE_AI_API_KEY");
      err.code = "AI_NOT_CONFIGURED";
      throw err;
    }
    try {
      const result = await AIChatSession.sendMessage(prompt);
      return result;
    } catch (e) {
      throw e;
    }
  }
  
  