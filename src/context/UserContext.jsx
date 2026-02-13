import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const STORAGE_KEY = 'palm_reader_user_profile';

const INITIAL_PROFILE = {
  name: '',
  dob: '', // YYYY-MM-DD
  timeOfBirth: '', // HH:mm
  gender: '', // 'male', 'female', 'other'
  zodiacSign: '', // Calculated automatically
  isOnboarded: false,
  readingsCount: 0, // Track usage for simple gamification
  lastDailyGuidance: null // Date string of last reading
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Auto-save whenever profile changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  /**
   * Update specific fields of the user profile
   * @param {Object} updates - { name: 'John', gender: 'male' }
   */
  const updateProfile = (updates) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  /**
   * Mark onboarding as complete
   */
  const completeOnboarding = () => {
    updateProfile({ isOnboarded: true });
  };

  /**
   * Increment the reading counter (Palm, Tarot, etc.)
   */
  const incrementReadings = () => {
    updateProfile({ readingsCount: (userProfile.readingsCount || 0) + 1 });
  };

  /**
   * Reset profile (Clear Data feature)
   */
  const resetProfile = () => {
    setUserProfile(INITIAL_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * Check if user has already received daily guidance today
   */
  const hasReceivedDailyGuidance = () => {
    if (!userProfile.lastDailyGuidance) return false;
    
    const today = new Date().toISOString().split('T')[0];
    return userProfile.lastDailyGuidance === today;
  };

  /**
   * Mark daily guidance as received
   */
  const markDailyGuidanceRead = () => {
    const today = new Date().toISOString().split('T')[0];
    updateProfile({ lastDailyGuidance: today });
  };

  const value = {
    userProfile,
    updateProfile,
    completeOnboarding,
    resetProfile,
    incrementReadings,
    hasReceivedDailyGuidance,
    markDailyGuidanceRead,
    isProfileComplete: !!(userProfile.name && userProfile.dob)
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
