'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const BOT_NAME = 'CRM Assistant';

const RESPONSES = {
  help: {
    triggers: ['help', 'commands', 'what can you do', '?'],
    reply: `Here's what I can do:\n• **list customers** — Show all customers\n• **add customer** — Go to add customer page\n• **invoices** — Open invoices page\n• **dashboard** — Go to main dashboard\n• **logout** — Sign out of the system`,
  },
  customers: {
    triggers: ['list customers', 'show customers', 'customers', 'customer list'],
    reply: 'Taking you to the customers list! 👥',
    action: '/customers',
  },
  addCustomer: {
    triggers: ['add customer', 'new customer', 'create customer'],
    reply: 'Opening the Add Customer form! ✏️',
    action: '/customers/new',
  },
  invoices: {
    triggers: ['invoice', 'invoices', 'billing', 'show invoices'],
    reply: 'Opening the Invoices module! 🧾',
    action: '/invoices',
  },
  dashboard: {
    triggers: ['dashboard', 'home', 'main', 'go home'],
    reply: 'Heading to the dashboard! 🏠',
    action: '/dashboard',
  },
  logout: {
    triggers: ['logout', 'log out', 'sign out', 'exit'],
    reply: 'Signing you out... Goodbye! 👋',
    action: 'LOGOUT',
  },
  hello: {
    triggers: ['hi', 'hello', 'hey', 'howdy'],
    reply: "Hello! 👋 I'm your CRM Assistant. Type **help** to see what I can do!",
  },
};

const getResponse = (input) => {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(RESPONSES)) {
    const r = RESPONSES[key];
    if (r.triggers.some((t) => lower.includes(t))) {
      return r;
    }
  }
  return {
    reply: "I didn't quite catch that. Try typing **help** to see available commands.",
  };
};

export default function Chatbot({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm your CRM Assistant 🤖\nType **help** to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { from: 'bot', text: response.reply }]);

      if (response.action) {
        setTimeout(() => {
          if (response.action === 'LOGOUT') {
            onLogout?.();
          } else {
            router.push(response.action);
            setOpen(false);
          }
        }, 800);
      }
    }, 400);
  };

  const renderText = (text) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        <br />
      </span>
    ));

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setOpen((o) => !o)}
        title="Open CRM Assistant"
        id="chatbot-toggle"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={18} />
              {BOT_NAME}
              <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 999, marginLeft: 4 }}>
                Online
              </span>
            </div>
            <button
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.from}`}>
                {renderText(m.text)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              id="chatbot-input"
              type="text"
              placeholder="Type a command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn btn-primary btn-sm" onClick={send} id="chatbot-send">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
