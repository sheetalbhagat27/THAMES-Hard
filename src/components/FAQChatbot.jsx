import { useState, useRef, useEffect } from 'react';
import './FAQChatbot.css';
import { FAQ_DATA, DEFAULT_SUGGESTIONS, FALLBACK_MESSAGE, matchFAQ } from '../data/faqs';
import { SITE, wa } from '../config';

const INITIAL_GREETING = {
  id: 'init-1',
  role: 'bot',
  content:
    'Hello! Welcome to Thames Hardware. I am your instant FAQ Assistant.\n\nClick any common question below or type your query about our 3D Motion Hinges, Telescopic Slides, Slim Mac Box, Kitchen fittings, or Dealership enquiries.',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isFallback: false,
};

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message on update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input field when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    setInputValue('');

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Append user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      time: timeNow,
    };

    // 2. Perform intelligent local FAQ lookup
    const matchedFaq = matchFAQ(text, FAQ_DATA);

    let botResponse;
    if (matchedFaq) {
      botResponse = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: matchedFaq.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: false,
      };
    } else {
      botResponse = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: FALLBACK_MESSAGE,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
      };
    }

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `init-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setShowSuggestions(true);
    setInputValue('');
  };

  const handleSelectSuggestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      {!isOpen && (
        <button
          className="faqchat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Thames FAQ Assistant"
          title="Ask Thames Hardware FAQ Assistant"
        >
          <span className="faqchat-launcher-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <div className="faqchat-launcher-text">
            <span className="faqchat-launcher-title">Thames FAQ Assistant</span>
            <span className="faqchat-launcher-sub">Instant Specs &amp; Answers</span>
          </div>
        </button>
      )}

      {/* 2. Chatbot Dialog Window */}
      {isOpen && (
        <section
          className="faqchat-window"
          role="dialog"
          aria-label="Thames Hardware Instant FAQ Assistant"
          aria-modal="false"
        >
          {/* Header */}
          <header className="faqchat-header">
            <div className="faqchat-header-brand">
              <div className="faqchat-avatar" aria-hidden="true">
                T
              </div>
              <div className="faqchat-header-info">
                <span className="faqchat-header-title">Thames Hardware FAQ</span>
                <span className="faqchat-header-status">
                  <span className="faqchat-status-dot" aria-hidden="true" />
                  Instant Local Assistant
                </span>
              </div>
            </div>

            <div className="faqchat-header-actions">
              {/* New / Reset Conversation */}
              <button
                className="faqchat-btn-icon"
                onClick={handleClearChat}
                title="Start New Chat"
                aria-label="Start new chat"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                className="faqchat-btn-icon"
                onClick={() => setIsOpen(false)}
                title="Close FAQ Assistant"
                aria-label="Close FAQ Assistant"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages Body */}
          <div className="faqchat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`faqchat-msg-row ${
                  msg.role === 'user' ? 'faqchat-msg-row-user' : 'faqchat-msg-row-bot'
                }`}
              >
                <div
                  className={`faqchat-bubble ${
                    msg.role === 'user' ? 'faqchat-bubble-user' : 'faqchat-bubble-bot'
                  }`}
                >
                  {msg.content}

                  {/* Fallback support contact links */}
                  {msg.isFallback && (
                    <div className="faqchat-fallback-box">
                      <span className="faqchat-fallback-text">
                        Connect directly with our team for immediate assistance:
                      </span>
                      <div className="faqchat-fallback-actions">
                        <a
                          href={`tel:${SITE.phoneRaw}`}
                          className="faqchat-action-link"
                        >
                          📞 Call {SITE.phone}
                        </a>
                        <a
                          href={wa('Hello Thames Support, I have an inquiry.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="faqchat-action-link"
                        >
                          💬 WhatsApp
                        </a>
                        <a
                          href={`mailto:${SITE.email}`}
                          className="faqchat-action-link"
                        >
                          ✉️ Email Support
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <span className="faqchat-time">{msg.time}</span>
              </div>
            ))}

            {/* Suggested FAQ Questions */}
            {showSuggestions && (
              <div className="faqchat-suggestions-container">
                <span className="faqchat-suggestions-label">Popular Questions:</span>
                <div className="faqchat-suggestions-grid">
                  {DEFAULT_SUGGESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      className="faqchat-suggestion-btn"
                      onClick={() => handleSelectSuggestion(q)}
                    >
                      <span>{q}</span>
                      <span className="faqchat-suggestion-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="faqchat-footer">
            <div className="faqchat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="faqchat-input"
                placeholder="Ask about hinges, slides, dealership, quote..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Type your FAQ question"
              />
              <button
                className="faqchat-btn-send"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                aria-label="Send Message"
                title="Send Message"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            <div className="faqchat-footer-disclaimer">
              <span>Press <strong>Enter</strong> to send</span>
              <span className="faqchat-footer-badge">100% Free · Local FAQ</span>
            </div>
          </footer>
        </section>
      )}
    </>
  );
}
