
import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in environment variables.');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export const geminiService = {
  async analyzeArticle(rawText: string) {
    const client = getAI();
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Extract a journalistic blog post from this Facebook content. Provide a catchy headline, a short excerpt (max 30 words), and the cleaned-up editorial content. Ensure the tone is professional and insightful like Noel Chiagorom.

Raw Text: ${rawText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING, description: 'One of: Politics, Economy, Society, Editorial, World' },
            readTime: { type: Type.STRING, description: 'Estimated read time like "5 min"' }
          },
          required: ["title", "excerpt", "content", "category", "readTime"]
        }
      }
    });

    try {
      return JSON.parse(response.text.trim());
    } catch (e) {
      console.error("Failed to parse AI response", e);
      return null;
    }
  }
};
