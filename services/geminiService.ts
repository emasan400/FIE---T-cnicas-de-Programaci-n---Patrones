import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getPatternExplanation = async (patternName: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key not configured. Unable to fetch definition.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a concise, academic definition (max 2 sentences) of the UI/UX pattern: "${patternName}". Focus on its purpose in Human-Computer Interaction. Respond in Spanish.`,
    });
    return response.text || "No definition available.";
  } catch (error) {
    console.error("Error fetching explanation:", error);
    return "Error retrieving definition from AI service.";
  }
};

export const generateMockStudents = async (count: number): Promise<any[]> => {
    const ai = getAiClient();
    if (!ai) return [];
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a JSON array of ${count} fictional university students. 
        Fields: id (string), name (string), major (string), gpa (number 0.0-4.0), status ('Active', 'Graduated', 'On Leave').
        Return ONLY the raw JSON array string, no markdown code blocks.`,
      });
      
      const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Error generating data:", error);
      return [];
    }
  };