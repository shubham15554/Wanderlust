import { GoogleGenAI } from "@google/genai";
import path  from 'path';

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Explain how AI works in a few words",
    config: {
        systemInstruction: `You are an expert travel copywriter and real estate marketer for 'Wanderlust', a premium vacation rental platform. 
        Your job is to generate catchy, luxurious, and highly engaging descriptions for property listings based on the provided images and minimal keywords.

        Follow these strict formatting rules:
        1. Tone: Warm, inviting, professional, and sophisticated.
        2. Length: Keep it concise (3 to 4 sentences max, around 60-80 words). Travelers don't read long walls of text.
        3. Structure: Highlight the best feature visible in the image (e.g., pool, view, architecture) and mention the vibe (e.g., peaceful getaway, romantic retreat, family adventure).
        4. No Placeholders: Do not write things like "[Insert Name Here]". Make the text complete and ready to publish.
        5. Language: Write in clear, appealing English.`
    },
  });

  console.log(response.text);
}

//main();



const generateDescription = async (base64ImageFile ) => {
    const contents = [
        {
            inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: contents,
    });

    return response.text;
}

export { generateDescription };