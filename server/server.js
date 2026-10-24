import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Warn if API key is not yet set
if (!OPENAI_API_KEY || OPENAI_API_KEY === "your_secret_api_key_here") {
  console.warn(
    "⚠️ WARNING: OPENAI_API_KEY is not configured or using default placeholder in server/.env.\n" +
    "Add your real OpenAI API key to server/.env to enable live AI responses."
  );
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || "dummy-key-to-init",
});

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Vite proxy)
      if (!origin) return callback(null, true);
      if (
        origin === FRONTEND_URL ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not allowed"));
    },
  })
);

app.use(express.json({ limit: "10kb" }));

// Rate limit for AI chat endpoint: max 20 requests per minute per IP
app.use(
  "/api/chat",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests. Please wait a moment before sending another message." },
  })
);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(OPENAI_API_KEY && OPENAI_API_KEY !== "your_secret_api_key_here"),
  });
});

const THAMES_INSTRUCTIONS =
  "You are Thames AI, the official intelligent assistant for Thames Hardware (Thamesply division), based in Yamuna Nagar, Haryana, India. " +
  "You assist architects, interior designers, modular furniture manufacturers, contractors, and homeowners. " +
  "You possess comprehensive knowledge about Thames architectural fittings: " +
  "1. Motion Hinges: 3D hydraulic soft-close (Full Overlay, Half Overlay, Inset, 90° blind corner, 175° corner, thick door hinges). " +
  "2. Telescopic Sliders: Ball-bearing slides (10\" to 24\" in Zinc, SS, Black; soft-close and ECO). " +
  "3. Kitchen Accessories: Slim Mac Boxes (88/171/202mm), Euro Champagne systems, pantry units, bottle pullouts, swing corners, magic corners, wicker baskets, hydraulic gas pumps. " +
  "4. Wardrobe Accessories: Leather jewelry boxes, trouser racks, rotating shoe towers, wardrobe lift-ups, watch winders. " +
  "5. Door Closers & Bed Fittings: Super (45kg), Prime (65kg), Platinum (80kg), Palmet (90kg), Concealed (100kg), and hydraulic bed lifters. " +
  "6. Aluminium Profiles: Gola, G, J, and Glass Frame & Handle Profiles (25mm, 45mm, 65mm). " +
  "7. Sliding Systems: Standard and Heavy-Duty Soft-Close door kits. " +
  "8. Butt Hinges: Grade 304 SS & Solid Brass hinges. " +
  "9. Precision Fasteners: Non-magnetic CSK Chipboard & SS screws in SS, Black, and Rose Gold. " +
  "Tone: Professional, helpful, concise, and technical when needed. " +
  "Do not invent prices (explain that pricing is provided upon direct trade quote). " +
  "If the user wants to place a bulk order, dealership inquiry, or technical drawing request, guide them to Customer Care (+91-98-99-322-322), Email (info@thamesply.com), or the website Contact / Catalogue page. " +
  "Do not claim access to private website, internal customer, or personal database records.";

// POST /api/chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "your_secret_api_key_here") {
      return res.status(503).json({
        error:
          "OpenAI API key is missing or not configured. Please add your OPENAI_API_KEY to server/.env and restart the backend.",
      });
    }

    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 10) {
      return res.status(400).json({
        error: "Invalid message history. Must contain between 1 and 10 messages.",
      });
    }

    const valid = messages.every(
      (m) =>
        m &&
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= 4000
    );

    if (!valid || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({
        error: "Invalid message format.",
      });
    }

    const formattedInput = messages.map(({ role, content }) => ({
      role,
      content: content.trim(),
    }));

    let replyText = "";

    // Primary: Try the official Responses API as requested
    try {
      if (typeof openai.responses?.create === "function") {
        const response = await openai.responses.create({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          instructions: THAMES_INSTRUCTIONS,
          input: formattedInput,
          max_output_tokens: 600,
        });
        replyText = response.output_text || response.output?.[0]?.content?.[0]?.text || "";
      }
    } catch (responsesErr) {
      console.warn("Responses API failed or model unavailable, falling back to chat completions:", responsesErr.message);
      // Fallback to chat completions if responses API fails or model isn't active
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: THAMES_INSTRUCTIONS },
          ...formattedInput,
        ],
        max_tokens: 600,
        temperature: 0.7,
      });
      replyText = chatResponse.choices?.[0]?.message?.content || "";
    }

    if (!replyText) {
      // Direct chat completions attempt if responses didn't return text
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: THAMES_INSTRUCTIONS },
          ...formattedInput,
        ],
        max_tokens: 600,
      });
      replyText = chatResponse.choices?.[0]?.message?.content || "Sorry, I could not generate an answer.";
    }

    res.json({ reply: replyText });
  } catch (error) {
    console.error("Chat error:", error?.message || error);

    // Provide helpful user-friendly error message
    let clientMessage = "Chatbot service is temporarily unavailable. Please try again in a moment.";
    if (error?.status === 401 || error?.code === "invalid_api_key") {
      clientMessage = "Invalid OpenAI API Key. Please verify your OPENAI_API_KEY in server/.env.";
    } else if (error?.status === 429) {
      clientMessage = "OpenAI rate limit or quota exceeded. Please check your OpenAI account billing/usage.";
    }

    res.status(error?.status || 500).json({
      error: clientMessage,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
