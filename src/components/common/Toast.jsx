import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useToast from '../../hooks/useToast';
import { cn } from '../../utils/helpers';

/**
 * 🍞 Toast Container
 * Displays the stack of toast notifications at the top of the screen.
 */
const Toast = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed top-safe left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none pt-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto"
            onClick={() => dismissToast(toast.id)}
          >
            <div className={cn(
              "flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-sm rounded-xl shadow-lg border backdrop-blur-md",
              getToastStyles(toast.type)
            )}>
              <div className="flex-1 text-sm font-medium">
                {toast.message}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Helper for dynamic styles
const getToastStyles = (type) => {
  switch (type) {
    case 'success':
      return "bg-green-500/20 border-green-500/30 text-green-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
    case 'error':
      return "bg-red-500/20 border-red-500/30 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
    case 'warning':
      return "bg-yellow-500/20 border-yellow-500/30 text-yellow-100";
    default: // info
      return "bg-cosmic-700/80 border-white/10 text-white shadow-glow-sm";
  }
};

export default Toast;
