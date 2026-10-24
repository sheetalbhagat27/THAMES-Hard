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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiPayload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      const botReply = {
        role: 'assistant',
        content: data.reply || 'Sorry, I could not generate an answer.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Unable to connect to the AI service. Please ensure the backend server is running.');
      setLastFailedMsg(text);
    } finally {
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
