import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator'; // Will create

/**
 * 💬 ChatContainer
 * Renders the list of messages.
 */
const ChatContainer = ({ messages, isTyping }) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <ChatMessage 
          key={msg.id} 
          message={msg} 
        />
      ))}

      {isTyping && (
        <div className="self-start">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
