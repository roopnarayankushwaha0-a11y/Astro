import { useEffect, useState } from 'react';
import useToast from './useToast';

/**
 * 🚪 useExitHandler Hook
 * 
 * Implements the "Press back again to exit" logic common in Android apps.
 * Should only be used on the Home screen.
 * 
 * @param {boolean} isFocused - Whether the current screen is Home
 */
const useExitHandler = (isFocused) => {
  const [exitAttempted, setExitAttempted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isFocused) return;

    const handlePopState = (event) => {
      // In PWA/Web, we can't truly "Exit" the browser app programmatically reliably.
      // But we can simulate the behavior or at least prevent accidental navigation back.
      
      // If we are at the root history state:
      if (exitAttempted) {
        // User pressed back twice quickly -> Allow default behavior (exit/close tab/minimize)
        // Or show a custom "Do you want to exit?" dialog
        // For PWA installed mode, window.close() might work if script opened it, 
        // but generally we just let history run out.
        
        // Optionally invoke a specific exit dialog if you prefer UI over behavior
      } else {
        // First press -> Show warning
        event.preventDefault(); // This is tricky in pure JS history, usually handled by preventing nav
        
        // Push state to cancel the back action
        window.history.pushState(null, '', window.location.pathname);
        
        showToast("Press back again to exit", "info", 2000);
        setExitAttempted(true);

        // Reset attempt after 2 seconds
        setTimeout(() => {
          setExitAttempted(false);
        }, 2000);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isFocused, exitAttempted, showToast]);
  
  return exitAttempted;
};

export default useExitHandler;
