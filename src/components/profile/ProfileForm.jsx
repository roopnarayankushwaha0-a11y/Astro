import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import useLanguage from '../../hooks/useLanguage';
import Button from '../common/Button';
import GenderSelector from './GenderSelector'; // Will create
import DatePicker from './DatePicker'; // Will create
import TimePicker from './TimePicker'; // Will create
import { calculateZodiacSign } from '../../services/horoscopeService';

/**
 * 📝 ProfileForm
 * Collects user data.
 */
const ProfileForm = ({ onComplete }) => {
  const { userProfile, updateProfile } = useUser();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    dob: userProfile.dob || '',
    timeOfBirth: userProfile.timeOfBirth || '12:00',
    gender: userProfile.gender || 'female'
  });

  const isValid = formData.name.length > 0 && formData.dob.length > 0;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Calculate Zodiac before saving
    const zodiac = calculateZodiacSign(formData.dob);

    updateProfile({
      ...formData,
      zodiacSign: zodiac
    });

    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider ml-1">
          {t('profile.nameLabel')}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Astra"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan/50 focus:bg-white/10 transition-all outline-none"
        />
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider ml-1">
          {t('profile.dobLabel')}
        </label>
        <DatePicker 
          value={formData.dob} 
          onChange={(val) => handleChange('dob', val)} 
        />
      </div>

      {/* Time of Birth */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider ml-1">
          {t('profile.timeLabel')}
        </label>
        <TimePicker 
          value={formData.timeOfBirth} 
          onChange={(val) => handleChange('timeOfBirth', val)} 
        />
        <p className="text-[10px] text-gray-500 ml-1">
          Used for rising sign accuracy (Optional)
        </p>
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider ml-1">
          {t('profile.genderLabel')}
        </label>
        <GenderSelector 
          value={formData.gender} 
          onChange={(val) => handleChange('gender', val)} 
        />
      </div>

      {/* Submit */}
      <div className="pt-6">
        <Button 
          type="submit" 
          fullWidth 
          variant="primary" 
          size="lg"
          disabled={!isValid}
        >
          {t('profile.setupBtn')}
        </Button>
      </div>

    </form>
  );
};

export default ProfileForm;
