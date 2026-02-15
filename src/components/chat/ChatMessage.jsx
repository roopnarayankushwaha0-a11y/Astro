import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import Logo from '../../assets/images/Logo'; // Avatar fallback

/**
 * 🗨️ ChatMessage
 * Bubble for User vs AI messages.
 * Supports Markdown-like formatting (basic paragraphs).
 */
const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm relative",
        isUser 
          ? "bg-accent-cyan text-cosmic-900 rounded-tr-sm" 
          : "bg-white/10 text-white border border-white/5 rounded-tl-sm backdrop-blur-sm",
        isError && "bg-red-500/20 border-red-500/50 text-red-200"
      )}>
        
        {/* Simple rendering of text with line breaks */}
        {message.content.split('\n').map((line, i) => (
          <p key={i} className={cn("mb-1 last:mb-0", line.trim() === "" && "h-2")}>
            {line}
          </p>
        ))}

        {/* Timestamp (Optional tiny text) */}
        <span className={cn(
          "text-[10px] opacity-50 block text-right mt-1",
          isUser ? "text-cosmic-900" : "text-gray-400"
        )}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

      </div>
    </motion.div>
  );
};

export default ChatMessage;
