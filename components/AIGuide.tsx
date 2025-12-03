import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getTravelAdvice } from '../services/geminiService';
import { useAppContext } from '../context/AppContext';

export const AIGuide: React.FC = () => {
  const { t, language } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: t('ai.welcome'),
      timestamp: new Date()
    }]);
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getTravelAdvice(input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-thai-gold to-yellow-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles size={24} />
        <span className="font-medium hidden md:inline">{t('ai.button')}</span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-0 right-0 z-50 w-full md:w-96 md:bottom-6 md:right-6 bg-white dark:bg-stone-900 shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 40px)', height: '600px' }}
      >
        {/* Header */}
        <div className="bg-river-blue dark:bg-stone-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">{t('ai.title')}</h3>
              <p className="text-xs text-white/80">{t('ai.subtitle')}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50 dark:bg-stone-950 space-y-4 h-[460px]">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-river-blue text-white rounded-br-none' 
                    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-bl-none border border-stone-100 dark:border-stone-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl rounded-bl-none border border-stone-100 dark:border-stone-700 flex items-center gap-2 text-stone-400">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs">{t('ai.loading')}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-stone-900 p-4 border-t border-stone-100 dark:border-stone-700">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('ai.placeholder')}
              className="w-full pl-4 pr-12 py-3 bg-stone-100 dark:bg-stone-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-thai-gold/50 transition-all text-stone-800 dark:text-stone-100 placeholder-stone-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-thai-gold text-white rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-stone-400">
              {t('ai.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
