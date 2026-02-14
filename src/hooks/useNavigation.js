import { useNavigation as useContextNavigation } from '../context/NavigationContext';

/**
 * 🧭 useNavigation Hook
 * 
 * Re-exports the hook from Context for cleaner imports across the app.
 * Allows components to import from '@hooks/useNavigation' instead of context.
 */

const useNavigation = () => {
  return useContextNavigation();
};

export default useNavigation;
