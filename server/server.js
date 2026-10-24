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

// Intelligent Thames Hardware Knowledge Engine fallback for instant answers
function getThamesKnowledgeReply(query) {
  const q = (query || "").toLowerCase();

  if (/^(hi|hii|hello|hey|namaste|good\s*(morning|afternoon|evening)|hola)/i.test(q.trim())) {
    return "Hello! Welcome to Thames Hardware. I am your AI assistant. How can I assist you with our architectural hinges, drawer slides, kitchen fittings, or wardrobe accessories today?";
  }

  if (q.includes("hinge") || q.includes("3d") || q.includes("hydraulic") || q.includes("overlay") || q.includes("inset")) {
    return "Thames Motion Hinges feature precision 3D hydraulic soft-close mechanisms with clip-on mounting plates and 105° opening angles. Available types:\n• Full Overlay (0° crank) for external door fronts\n• Half Overlay (8° crank) for dual-cabinet partitions\n• Inset (15° crank) for recessed doors\n• Special angles: 175° wide opening, 90° blind corner, and thick door hinges for heavy luxury panels.\nAll are built from cold-rolled steel with multi-layer nickel plating.";
  }

  if (q.includes("slide") || q.includes("telescopic") || q.includes("channel") || q.includes("runner") || q.includes("ball bearing")) {
    return "Thames Telescopic Drawer Slides are manufactured from heavy-duty cold-rolled steel (1.2 x 1.2 x 1.5mm thickness) with high-precision steel ball bearings. Available in:\n• Sizes: 10\" (250mm) to 24\" (600mm)\n• Load Capacity: up to 45 kg\n• Finishes: Zinc Plated, Stainless Steel (Grade 304), and Sleek Matte Black\n• Options: Standard smooth glide and integrated Soft-Close.";
  }

  if (q.includes("slim mac") || q.includes("mac box") || q.includes("tandem") || q.includes("drawer box")) {
    return "The Thames Slim Mac Box is a luxury double-wall drawer system featuring synchronized soft-closing runners with 40kg dynamic weight rating. Available in heights of 88mm, 171mm, and 202mm with depths from 450mm to 550mm, and integrated 3D front adjustment for seamless cabinet alignment.";
  }

  if (q.includes("kitchen") || q.includes("pantry") || q.includes("corner") || q.includes("wicker") || q.includes("pullout") || q.includes("gas pump") || q.includes("lift")) {
    return "Thames Modular Kitchen accessories include:\n• Tall Pantry Storage Units (6-tier)\n• Universal Magic Corner & Swing Corner pullouts\n• Bottle Pullouts (2-tier & 3-tier in SS and Euro Champagne)\n• Natural Beechwood Wicker Baskets\n• Heavy-Duty Hydraulic Gas Springs for overhead cabinet doors.";
  }

  if (q.includes("wardrobe") || q.includes("closet") || q.includes("jewel") || q.includes("trouser") || q.includes("shoe")) {
    return "Thames Wardrobe Organization systems feature:\n• Handcrafted Leather Jewelry & Watch Organizer Drawers\n• Soft-Close Trouser & Saree Racks\n• 360° Rotating Multi-Tier Shoe Towers\n• Ergonomic Wardrobe Lift-Up Hangers for high ceiling cabinets.";
  }

  if (q.includes("door closer") || q.includes("closer") || q.includes("bed fitting") || q.includes("hydraulic bed")) {
    return "Thames Door Closers range from Super (45kg), Prime (65kg), Platinum (80kg), Palmet (90kg), to Concealed (100kg) models with adjustable latching speed. We also manufacture Heavy-Duty Hydraulic Bed Lift Mechanisms for smooth under-bed storage access.";
  }

  if (q.includes("screw") || q.includes("fastener") || q.includes("chipboard")) {
    return "Thames CSK Chipboard Screws are precision manufactured from non-magnetic stainless steel and high-tensile carbon steel. Finishes include Stainless Steel, Black Phosphate, and Architectural Rose Gold.";
  }

  if (q.includes("dealer") || q.includes("distributor") || q.includes("bulk") || q.includes("franchise")) {
    return "To partner with Thames Hardware as an authorized dealer or distributor, please visit our 'Become a Dealer' page on the website or reach out directly to our dealer development team at info@thamesply.com or +91-98-99-322-322.";
  }

  if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("quote")) {
    return "Thames Hardware products are supplied through verified trade partners and authorized distributors across India. For customized project pricing and volume estimates, click the 'Get a Quote' button on our website or call Customer Care at +91-98-99-322-322.";
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("call") || q.includes("address") || q.includes("location")) {
    return "Thames Hardware (Thamesply Division) Contact Details:\n• Phone / WhatsApp: +91-98-99-322-322 (Mon–Sat 9:30 AM – 6:30 PM IST)\n• Email: info@thamesply.com\n• Manufacturing & HQ: Yamuna Nagar, Haryana, India.";
  }

  return "Thames Hardware manufactures premium architectural motion hinges, telescopic drawer slides, Slim Mac Boxes, kitchen pullouts, wardrobe accessories, and precision door hardware. Would you like specifications for a specific category or assistance requesting a dealer quote?";
}

// POST /api/chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
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

    const lastUserMessage = messages[messages.length - 1].content.trim();

    // If OpenAI key is not configured, provide intelligent Thames catalogue response
    const hasLiveKey = OPENAI_API_KEY && OPENAI_API_KEY !== "your_secret_api_key_here";
    if (!hasLiveKey) {
      return res.json({
        reply: getThamesKnowledgeReply(lastUserMessage),
        mode: "catalogue",
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
      try {
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
      } catch (completionsErr) {
        console.warn("Chat completions error:", completionsErr.message);
      }
    }

    if (!replyText) {
      replyText = getThamesKnowledgeReply(lastUserMessage);
    }

    res.json({ reply: replyText });
  } catch (error) {
    console.error("Chat error:", error?.message || error);
    const lastUserMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
    // Fall back to catalogue knowledge instead of failing
    const fallbackReply = getThamesKnowledgeReply(lastUserMessage);
    res.json({ reply: fallbackReply, mode: "fallback" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
