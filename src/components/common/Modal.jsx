import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/helpers';
import CloseIcon from '../../assets/icons/CloseIcon'; // Will create later
import IconButton from './IconButton';

/**
 * 🖼️ Modal Component
 * Reusable dialog overlay with glassmorphism style.
 * Portals to document.body for correct z-indexing.
 * 
 * @param {boolean} isOpen - Control visibility
 * @param {function} onClose - Close handler
 * @param {string} title - Optional header
 * @param {node} children - Content
 */
const Modal = ({ isOpen, onClose, title, children, className }) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={cn(
              "relative w-full max-w-md bg-cosmic-800/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden",
              className
            )}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>
              <IconButton size="sm" variant="ghost" onClick={onClose}>
                <CloseIcon className="w-5 h-5 text-gray-400" />
              </IconButton>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
