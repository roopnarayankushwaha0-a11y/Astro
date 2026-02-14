import { useEffect } from 'react';

/**
 * 🔙 useBackHandler Hook
 * 
 * Allows a component to intercept the browser/hardware back button.
 * Useful for:
 * - Closing Modals instead of navigating back
 * - Confirming exit during a long process (like scanning)
 * 
 * @param {Function} handler - Function to execute when back is pressed. Return true to STOP default back navigation.
 */
const useBackHandler = (handler) => {
  useEffect(() => {
    // We listen to the popstate event which fires when back button is hit
    const handlePopState = (event) => {
      // Execute the custom handler
      // If handler returns true, we want to prevent default navigation (stay on page)
      // Since popstate happens *after* the URL changes, we strictly push the state back
      
      const shouldPreventDefault = handler();
      
      if (shouldPreventDefault) {
        // Push state back to maintain current URL (effectively cancelling the back)
        window.history.pushState(null, '', window.location.pathname);
        event.preventDefault();
      }
    };

    // Push a dummy state so we have something to "pop" if we want to intercept
    // This is a common trick for SPAs handling hardware back buttons
    // window.history.pushState(null, '', window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handler]);
};

export default useBackHandler;
