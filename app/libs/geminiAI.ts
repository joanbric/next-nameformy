import { GoogleGenerativeAI, SchemaType, Schema, GenerationConfig } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (typeof apiKey !== "string") throw new Error("API key not found");
const genAI = new GoogleGenerativeAI(apiKey);

const responseSchema: Schema = {
  description: "A list of name suggestions",
  type: SchemaType.ARRAY,

  items: {
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING
      },
      meaning: {
        type: SchemaType.STRING
      },
      IPA: {
        type: SchemaType.STRING
      },
      advantages: {
        type: SchemaType.STRING
      },
      disadvantages: {
        type: SchemaType.STRING
      }
    },
    required: [
      "name",
      "meaning",
      "IPA",
      "advantages",
      "disadvantages"
    ]
  }
}

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1500,
  responseMimeType: "application/json",
  responseSchema
};
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction: "You are an expert on names. You have studied all kinds of names, when they are good and how convenient they are at the momento to be assigned. Your responses should not be longer.",
  generationConfig,
});

export async function askAI(prompt: string) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

