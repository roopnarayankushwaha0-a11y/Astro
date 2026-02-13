import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AppContext = createContext();

/**
 * 🌍 Global App State Provider
 * Manages application-wide states like loading overlays, initialization, and error boundaries.
 */
export const AppProvider = ({ children }) => {
  // 🔄 Global Loading State (for blocking overlays)
  const [isLoading, setIsLoading] = useState(false);
  
  // 🚀 App Initialization State
  const [isAppReady, setIsAppReady] = useState(false);
  
  // ⚠️ Global Error State
  const [error, setError] = useState(null);

  // 🛠️ Initialize App Logic (Simulated for now)
  useEffect(() => {
    const initApp = async () => {
      try {
        // Simulate checking local storage, auth tokens, or warming up AI services
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAppReady(true);
      } catch (err) {
        console.error("App Initialization Failed:", err);
        setError("Failed to load application resources.");
      }
    };

    initApp();
  }, []);

  /**
   * Trigger a global blocking loader
   * @param {boolean} status 
   */
  const setGlobalLoading = (status) => {
    setIsLoading(status);
  };

  /**
   * Clear global errors
   */
  const clearError = () => {
    setError(null);
  };

  const value = {
    isLoading,
    setGlobalLoading,
    isAppReady,
    error,
    setError,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * 🪝 Custom Hook to use App Context
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
