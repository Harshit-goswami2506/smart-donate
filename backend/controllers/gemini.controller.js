import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const geminiController = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiUrl = process.env.GEMINI_URL;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiUrl || !apiKey) {
      return res
        .status(500)
        .json({ success: false, error: "Gemini API configuration missing." });
    }

const fullPrompt = `
You are Smart Donate’s chatbot — warm, compassionate, and motivating.
Encourage users to explore verified charity causes and donate generously.
Be concise but heartfelt.
User says: ${prompt}
`;

    const response = await axios.post(
      `${apiUrl}?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: fullPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    
    

    const candidate = response.data?.candidates?.[0];
    let aiText = "No response from Gemini model.";
    if (candidate?.content?.parts?.length) {
      const textPart = candidate.content.parts.find((p) => p.text);
      if (textPart?.text) aiText = textPart.text;
    }

    res.json({ success: true, data: aiText });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
};
