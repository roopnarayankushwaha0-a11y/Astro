import React from 'react';

/**
 * 📦 SettingsGroup
 * Wraps SettingsItems in a styled block with an optional title.
 */
const SettingsGroup = ({ title, children }) => {
  return (
    <div className="mb-2">
      {title && (
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-2">
          {title}
        </h3>
      )}
      
      <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default SettingsGroup;
