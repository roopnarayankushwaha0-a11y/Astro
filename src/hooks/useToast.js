import { create } from 'zustand';

/**
 * 🍞 useToast Hook (Global State via Zustand)
 * 
 * Manages the queue of toast notifications.
 * We use Zustand here instead of Context to avoid re-rendering the whole app tree
 * just to show a notification.
 */

const useToastStore = create((set) => ({
  toasts: [],
  
  /**
   * Add a new toast
   * @param {string} message - Text to display
   * @param {string} type - 'success', 'error', 'info', 'warning'
   * @param {number} duration - ms to auto-dismiss
   */
  addToast: (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }]
    }));

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }));
      }, duration);
    }
  },

  /**
   * Remove specific toast
   */
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));

// Export the hook for components to use
const useToast = () => {
  const { addToast, removeToast, toasts } = useToastStore();
  
  return {
    showToast: addToast,
    dismissToast: removeToast,
    toasts
  };
};

export default useToast;
