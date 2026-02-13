import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NavigationContext = createContext();

// 🧭 Screen Constants
export const SCREENS = {
  SPLASH: 'SPLASH',
  LANGUAGE: 'LANGUAGE',
  ONBOARDING: 'ONBOARDING',
  PROFILE: 'PROFILE',
  HOME: 'HOME',
  PALM_SCAN: 'PALM_SCAN',
  PALM_RESULT: 'PALM_RESULT',
  AI_CHAT: 'AI_CHAT',
  TAROT_MENU: 'TAROT_MENU',
  TAROT_READING: 'TAROT_READING',
  LOVE_READING: 'LOVE_READING',
  DAILY_GUIDANCE: 'DAILY_GUIDANCE',
  HOROSCOPE: 'HOROSCOPE',
  SETTINGS: 'SETTINGS',
  PRIVACY: 'PRIVACY'
};

export const NavigationProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [navigationParams, setNavigationParams] = useState({});
  const [historyStack, setHistoryStack] = useState([SCREENS.SPLASH]);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'back'

  /**
   * 🚀 Navigate to a new screen
   * @param {string} screenName - Target screen from SCREENS constant
   * @param {object} params - Optional data to pass to the screen
   * @param {boolean} replace - If true, replaces current history entry instead of pushing
   */
  const navigate = useCallback((screenName, params = {}, replace = false) => {
    if (!SCREENS[screenName]) {
      console.error(`Attempted to navigate to invalid screen: ${screenName}`);
      return;
    }

    setDirection('forward');
    setNavigationParams(params);

    if (replace) {
      // Replace current screen (good for Onboarding -> Home transition)
      setHistoryStack(prev => {
        const newStack = [...prev];
        newStack[newStack.length - 1] = screenName;
        return newStack;
      });
      setCurrentScreen(screenName);
      
      // Update browser history
      window.history.replaceState({ screen: screenName }, '', null);
    } else {
      // Push new screen
      setHistoryStack(prev => [...prev, screenName]);
      setCurrentScreen(screenName);
      
      // Push to browser history
      window.history.pushState({ screen: screenName }, '', null);
    }
  }, []);

  /**
   * ⬅️ Go Back one step
   * Returns true if back navigation was successful, false if at root (stack empty/1)
   */
  const goBack = useCallback(() => {
    if (historyStack.length <= 1) {
      return false; // Cannot go back further
    }

    setDirection('back');
    
    // Logic handles in popstate listener, but we can manually trigger history.back()
    // to keep browser sync
    window.history.back();
    return true;
  }, [historyStack]);

  /**
   * 🏠 Reset to Home (Clears stack)
   */
  const resetToHome = useCallback(() => {
    setDirection('back');
    setHistoryStack([SCREENS.HOME]);
    setCurrentScreen(SCREENS.HOME);
    setNavigationParams({});
    
    // Clear browser history visual hack (cannot actually clear browser history)
    // We push Home state to ensure clean slate
    window.history.pushState({ screen: SCREENS.HOME }, '', null);
  }, []);

  /**
   * 👂 Listen for Browser Back Button (Hardware Back on Android)
   */
  useEffect(() => {
    const handlePopState = (event) => {
      // If event.state is null, we might be at the initial entry
      const targetScreen = event.state?.screen;

      if (targetScreen) {
        setDirection('back');
        setCurrentScreen(targetScreen);
        
        // Sync our internal stack
        setHistoryStack(prev => {
          const newStack = [...prev];
          // If we popped, we assume we went back, so remove the last item
          // This is a simplified assumption for a linear stack
          if (newStack.length > 1 && newStack[newStack.length - 2] === targetScreen) {
             newStack.pop();
          }
          return newStack;
        });
      } else {
        // Fallback if state is lost (rare)
        // Usually implies we went back to before the app mounted
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value = {
    currentScreen,
    navigationParams,
    historyStack,
    direction,
    navigate,
    goBack,
    resetToHome
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationContext;
