import config from "./config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.gemini.api_key as string);

async function generateCaptions(social_network: string, topic: string, tone: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a 5 caption for ${social_network}, topic is ${topic} with style of ${tone} your result will return in JSON format {captions: ["caption1", "caption2",....]}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("rawtext", text);
    try {
      // Remove backticks and any extraneous characters if necessary
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "");
      console.log("Cleaned response text:", cleanText);
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }
  }

  async function generateIdeals(topic: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `give me 10 idea about topic ${topic} your result will return in JSON format {ideas: ["ideal1", "ideal2",....]}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("rawtext", text);
    try {
      // Remove backticks and any extraneous characters if necessary
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "");
      console.log("Cleaned response text:", cleanText);
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }
  }

  async function generateCaptionsWithIdeal(idea: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a 5 caption with idea is ${idea} your result will return in JSON format {captions: ["caption1", "caption2",....]}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("rawtext", text);
    try {
      // Remove backticks and any extraneous characters if necessary
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "");
      console.log("Cleaned response text:", cleanText);
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }
  }

export { genAI, generateCaptions, generateIdeals, generateCaptionsWithIdeal };

