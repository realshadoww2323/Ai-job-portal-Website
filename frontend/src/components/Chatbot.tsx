'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI Career Assistant. Ask me about job scopes, required courses, or certifications!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Show a loading indicator by adding a temporary bot message
    setMessages(prev => [...prev, { role: 'bot', text: '...' }]);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages.pop();
          newMessages.push({ role: 'bot', text: 'AI Chat requires a NEXT_PUBLIC_GEMINI_API_KEY environment variable to be set. Please add it to your Netlify site settings.' });
          return newMessages;
        });
        return;
      }

      const prompt = `You are a professional, highly intelligent AI Career Assistant for an advanced Job Portal. 
      A user is asking you for career advice, job scopes, interview tips, or course recommendations.
      Be concise, helpful, and speak directly to their question. Don't use markdown formatting like ** or *, just plain text.
      
      User's message: "${userMsg}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
      );
      
      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      
      // Remove the '...' loading message and add the real response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); // Remove '...'
        newMessages.push({ role: 'bot', text: reply });
        return newMessages;
      });
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push({ role: 'bot', text: 'Error connecting to the AI server.' });
        return newMessages;
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition transform z-50 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
            <div className="bg-slate-800 p-2 rounded-full">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI Career Assistant</h3>
              <p className="text-slate-300 text-xs">Always online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Ask about jobs, courses..." 
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition text-slate-900"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
