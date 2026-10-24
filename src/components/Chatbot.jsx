import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const DEFAULT_GREETING = {
  role: 'assistant',
  content:
    'Hello! Welcome to Thames Hardware. I am your AI assistant. How can I assist you with our architectural hinges, drawer slides, kitchen fittings, or wardrobe accessories today?',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const QUICK_STARTERS = [
  'What are the 3D Motion Hinges specs?',
  'Tell me about Telescopic Sliders sizes',
  'What is the Slim Mac Box?',
  'How do I enquire about a dealership?',
];

function getClientThamesReply(query) {
  const q = (query || '').toLowerCase();

  if (/^(hi|hii|hello|hey|namaste|good\s*(morning|afternoon|evening)|hola)/i.test(q.trim())) {
    return 'Hello! Welcome to Thames Hardware. I am your AI assistant. How can I assist you with our architectural hinges, drawer slides, kitchen fittings, or wardrobe accessories today?';
  }

  if (q.includes('hinge') || q.includes('3d') || q.includes('hydraulic') || q.includes('overlay') || q.includes('inset')) {
    return 'Thames Motion Hinges feature precision 3D hydraulic soft-close mechanisms with clip-on mounting plates and 105° opening angles. Available types:\n• Full Overlay (0° crank) for external door fronts\n• Half Overlay (8° crank) for dual-cabinet partitions\n• Inset (15° crank) for recessed doors\n• Special angles: 175° wide opening, 90° blind corner, and thick door hinges for heavy luxury panels.\nAll are built from cold-rolled steel with multi-layer nickel plating.';
  }

  if (q.includes('slide') || q.includes('telescopic') || q.includes('channel') || q.includes('runner') || q.includes('ball bearing')) {
    return 'Thames Telescopic Drawer Slides are manufactured from heavy-duty cold-rolled steel (1.2 x 1.2 x 1.5mm thickness) with precision steel ball bearings. Available in:\n• Sizes: 10" (250mm) to 24" (600mm)\n• Load Capacity: up to 45 kg\n• Finishes: Zinc Plated, Stainless Steel (Grade 304), and Sleek Matte Black\n• Options: Standard smooth glide and integrated Soft-Close.';
  }

  if (q.includes('slim mac') || q.includes('mac box') || q.includes('tandem') || q.includes('drawer box')) {
    return 'The Thames Slim Mac Box is a luxury double-wall drawer system featuring synchronized soft-closing runners with 40kg dynamic weight rating. Available in heights of 88mm, 171mm, and 202mm with depths from 450mm to 550mm, and integrated 3D front adjustment for seamless cabinet alignment.';
  }

  if (q.includes('kitchen') || q.includes('pantry') || q.includes('corner') || q.includes('wicker') || q.includes('pullout') || q.includes('gas pump') || q.includes('lift')) {
    return 'Thames Modular Kitchen accessories include:\n• Tall Pantry Storage Units (6-tier)\n• Universal Magic Corner & Swing Corner pullouts\n• Bottle Pullouts (2-tier & 3-tier in SS and Euro Champagne)\n• Natural Beechwood Wicker Baskets\n• Heavy-Duty Hydraulic Gas Springs for overhead cabinet doors.';
  }

  if (q.includes('wardrobe') || q.includes('closet') || q.includes('jewel') || q.includes('trouser') || q.includes('shoe')) {
    return 'Thames Wardrobe Organization systems feature:\n• Handcrafted Leather Jewelry & Watch Organizer Drawers\n• Soft-Close Trouser & Saree Racks\n• 360° Rotating Multi-Tier Shoe Towers\n• Ergonomic Wardrobe Lift-Up Hangers for high ceiling cabinets.';
  }

  if (q.includes('door closer') || q.includes('closer') || q.includes('bed fitting') || q.includes('hydraulic bed')) {
    return 'Thames Door Closers range from Super (45kg), Prime (65kg), Platinum (80kg), Palmet (90kg), to Concealed (100kg) models with adjustable latching speed. We also manufacture Heavy-Duty Hydraulic Bed Lift Mechanisms for smooth under-bed storage access.';
  }

  if (q.includes('screw') || q.includes('fastener') || q.includes('chipboard')) {
    return 'Thames CSK Chipboard Screws are precision manufactured from non-magnetic stainless steel and high-tensile carbon steel. Finishes include Stainless Steel, Black Phosphate, and Architectural Rose Gold.';
  }

  if (q.includes('dealer') || q.includes('distributor') || q.includes('bulk') || q.includes('franchise')) {
    return 'To partner with Thames Hardware as an authorized dealer or distributor, please visit our "Become a Dealer" page or reach out directly to our dealer development desk at info@thamesply.com or +91-98-99-322-322.';
  }

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote')) {
    return 'Thames Hardware products are supplied through verified trade partners and authorized distributors across India. For customized project pricing and volume estimates, click the "Get a Quote" button on our website or call Customer Care at +91-98-99-322-322.';
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('address') || q.includes('location')) {
    return 'Thames Hardware (Thamesply Division) Contact Details:\n• Phone / WhatsApp: +91-98-99-322-322 (Mon–Sat 9:30 AM – 6:30 PM IST)\n• Email: info@thamesply.com\n• Manufacturing & HQ: Yamuna Nagar, Haryana, India.';
  }

  return 'Thames Hardware manufactures premium architectural motion hinges, telescopic drawer slides, Slim Mac Boxes, kitchen pullouts, wardrobe accessories, and precision door hardware. Would you like specifications for a specific category or assistance requesting a dealer quote?';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([DEFAULT_GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMsg, setLastFailedMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages or typing indicator
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setError(null);
    setLastFailedMsg(null);
    setInput('');

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', content: text, time: now };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Prepare context: last 10 messages for server
    const apiPayload = updatedMessages
      .slice(-10)
      .map(({ role, content }) => ({ role, content }));

    let replyContent = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiPayload }),
      });

      const rawText = await response.text();
      let data = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          data = null;
        }
      }

      if (response.ok && data?.reply) {
        replyContent = data.reply;
      } else {
        // Fall back to client knowledge engine if server response is not ok or missing reply
        replyContent = getClientThamesReply(text);
      }
    } catch (err) {
      console.warn('Network issue reaching /api/chat, using client knowledge engine:', err);
      // Seamlessly answer with local knowledge engine so user never sees JSON parse errors
      replyContent = getClientThamesReply(text);
    } finally {
      const botReply = {
        role: 'assistant',
        content: replyContent || getClientThamesReply(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        ...DEFAULT_GREETING,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setError(null);
    setLastFailedMsg(null);
    setInput('');
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className="uchat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Hardware Assistant"
          title="Ask Thames AI Assistant"
        >
          <span className="uchat-launcher-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          <div className="uchat-launcher-text">
            <span className="uchat-launcher-title">Ask Thames AI</span>
            <span className="uchat-launcher-sub">Instant Specs &amp; Help</span>
          </div>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <section
          className="uchat-window"
          role="region"
          aria-label="Thames AI Hardware Assistant Chat Window"
        >
          {/* Header */}
          <header className="uchat-header">
            <div className="uchat-header-brand">
              <div className="uchat-avatar-circle" aria-hidden="true">
                T
              </div>
              <div className="uchat-header-info">
                <span className="uchat-header-title">Thames Hardware AI</span>
                <span className="uchat-header-status">
                  <span className="uchat-status-dot" aria-hidden="true"></span>
                  Architectural Desk Online
                </span>
              </div>
            </div>

            <div className="uchat-header-actions">
              <button
                className="uchat-btn-icon"
                onClick={handleNewChat}
                title="Start New Chat"
                aria-label="Start New Chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M3 21v-5h5"></path>
                </svg>
              </button>
              <button
                className="uchat-btn-icon"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="uchat-messages">
            <div className="uchat-welcome-banner">
              <span className="uchat-welcome-title">Thames Architectural Knowledge</span>
              Ask about our 100K cycle-tested motion hinges, drawer slides, kitchen accessories, finishes, or dealer network.
              <div className="uchat-quick-prompts">
                {QUICK_STARTERS.map((prompt) => (
                  <button
                    key={prompt}
                    className="uchat-chip"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {messages.map((m, idx) => (
              <div key={idx} className={`uchat-msg-row ${m.role}`}>
                <div className="uchat-bubble">
                  <div className="uchat-msg-text">{m.content}</div>
                  <span className="uchat-msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="uchat-msg-row assistant">
                <div className="uchat-typing-indicator" aria-label="AI is generating response">
                  <div className="uchat-typing-dot"></div>
                  <div className="uchat-typing-dot"></div>
                  <div className="uchat-typing-dot"></div>
                </div>
              </div>
            )}

            {error && (
              <div className="uchat-error-banner" role="alert">
                <span>{error}</span>
                {lastFailedMsg && (
                  <button
                    className="uchat-retry-btn"
                    onClick={() => handleSendMessage(lastFailedMsg)}
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="uchat-footer">
            <div className="uchat-input-box">
              <textarea
                ref={inputRef}
                rows={1}
                className="uchat-input-field"
                placeholder="Ask about hinges, slides, specs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                aria-label="Type your message"
              />
              <button
                className="uchat-send-btn"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                aria-label="Send Message"
                title="Send Message"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <span className="uchat-disclaimer">
              Powered by OpenAI · Official Thames Hardware Assistant
            </span>
          </footer>
        </section>
      )}
    </>
  );
}
