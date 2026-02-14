import React, { useState, useRef, useEffect } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import ChatContainer from '../components/chat/ChatContainer'; // Will create
import ChatInput from '../components/chat/ChatInput'; // Will create
import { getChatResponse } from '../services/aiService';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import { calculateZodiacSign } from '../services/horoscopeService';

/**
 * 💬 AIPalmChatScreen
 * Conversational UI with "Astra" (The AI Guide).
 * Uses history context to maintain conversation state during session.
 */
const AIPalmChatScreen = () => {
  const { userProfile } = useUser();
  const { t, language } = useLanguage();
  
  // Local chat state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: t('home.greeting') + " " + t('home.chatDesc') + ". " + t('tarot.pickCategory')
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll logic
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  /**
   * Send Message Handler
   */
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 2. Prepare Context (Zodiac, Name)
      const zodiac = calculateZodiacSign(userProfile.dob);
      const context = `Name: ${userProfile.name}, Gender: ${userProfile.gender}, Zodiac: ${zodiac}`;
      
      // 3. Convert local state to API format
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));
      // Add current message
      history.push({ role: 'user', content: text });

      // 4. API Call
      const responseText = await getChatResponse(history, context, language);

      // 5. Add AI Message
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText
      };
      
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: t('common.error'),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ScreenWrapper>
      <Header title={t('home.chat')} />

      <PageTransition>
        <div className="flex flex-col h-full pt-16 pb-safe">
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <ChatContainer 
              messages={messages} 
              isTyping={isTyping} 
            />
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-4 py-2 bg-cosmic-900/80 backdrop-blur-lg border-t border-white/5">
            <ChatInput 
              onSend={handleSendMessage} 
              disabled={isTyping}
              placeholder={t('tarot.pickCategory')} // Reusing "What is your focus?" text
            />
          </div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default AIPalmChatScreen;
