import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getTravelAdvice = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "Please configure your API Key to use the AI Guide feature.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'Siri-Sorn', a knowledgeable and friendly local tour guide for Chachoengsao Province, Thailand. 
        Your goal is to promote tourism in this region.
        
        Key Facts about Chachoengsao to use:
        - It is known as the "River City" on the Bang Pakong River.
        - Famous for Wat Sothon Wararam Worawihan (one of Thailand's most revered temples).
        - Home to the giant Pink Ganesha at Wat Saman Rattanaram.
        - Famous for "Khanom Chak" (sweet sticky rice in palm leaf) and mangoes.
        - 100-year-old Klong Suan Market is a vintage highlight.
        
        Tone: Welcoming, polite (use Thai politeness particles like 'Sawansdee' or 'Khrup/Ka' occasionally but keep it English), and enthusiastic.
        Keep responses concise (under 100 words) unless asked for a detailed itinerary.
        `,
      }
    });
    return response.text || "I'm having a little trouble connecting to the spirits of the river. Please ask again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I cannot reach my travel scrolls right now. Please try again later.";
  }
};