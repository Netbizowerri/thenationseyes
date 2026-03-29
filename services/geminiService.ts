
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async analyzeArticle(rawText: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
