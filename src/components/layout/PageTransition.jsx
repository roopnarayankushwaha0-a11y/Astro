import React from 'react';
import { motion } from 'framer-motion';
import useNavigation from '../../hooks/useNavigation';

/**
 * 🔄 PageTransition
 * Wraps screen content to provide slide/fade animations between routes.
 * Uses navigation direction to determine slide direction.
 */
const PageTransition = ({ children, className }) => {
  const { direction } = useNavigation();

  // Define variants based on navigation direction
  const variants = {
    initial: (dir) => ({
      x: dir === 'forward' ? '100%' : '-30%',
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: (dir) => ({
      x: dir === 'forward' ? '-30%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full h-full ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
