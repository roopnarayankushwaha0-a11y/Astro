import React, { useState, useRef, useEffect } from 'react';
import IconButton from '../common/IconButton';
import { cn } from '../../utils/helpers';

/**
 * ⌨️ ChatInput
 * Auto-growing textarea for chatting.
 */
const ChatInput = ({ onSend, disabled, placeholder }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [text]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-end gap-2 w-full max-w-2xl mx-auto"
    >
      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-accent-cyan/50 focus-within:bg-white/10 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type a message..."}
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent text-white px-4 py-3 text-sm focus:outline-none resize-none max-h-[120px] placeholder:text-gray-500"
        />
      </div>

      <IconButton 
        type="submit"
        variant="active" 
        size="md"
        disabled={!text.trim() || disabled}
        className={cn(
          "mb-0.5 shrink-0 transition-all",
          (!text.trim() || disabled) ? "opacity-50 grayscale" : "opacity-100"
        )}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="w-5 h-5 rotate-90"
          strokeWidth={2.5}
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </IconButton>
    </form>
  );
};

export default ChatInput;
