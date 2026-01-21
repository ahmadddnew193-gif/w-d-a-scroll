import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePartDescription = async (partName: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "W.D.A Antigravity Tech - Configuration loading...";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, punchy, futuristic, 2-sentence marketing description for the "${partName}" of the W.D.A (Walk Defying Air) sneaker. 
      Focus on "Antigravity" technology, weightlessness, and advanced materials. 
      Do not use hashtags. Keep it technical but exciting.`,
    });
    return response.text || "Data unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Antigravity module synchronization failed. Manual override required.";
  }
};

export const generatePricingPlan = async (): Promise<any> => {
  // Mocking this for reliability in the demo, but demonstrating structure
  // In a real app, we could generate dynamic pricing tiers based on user location/demand
  return [
    { title: "Module A", price: "$299", features: ["Basic Antigravity", "Carbon Plate", "24h Battery"] },
    { title: "Module Pro", price: "$499", features: ["Full Levitation", "Neural Link", "Infinite Battery"] },
  ];
};