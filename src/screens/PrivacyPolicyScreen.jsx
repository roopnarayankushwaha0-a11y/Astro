import React from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import useLanguage from '../hooks/useLanguage';

/**
 * 🔒 PrivacyPolicyScreen
 * Essential for Play Store compliance.
 * Static text explaining data usage.
 */
const PrivacyPolicyScreen = () => {
  const { t } = useLanguage();

  return (
    <ScreenWrapper>
      <Header title={t('settings.privacy')} />

      <PageTransition>
        <div className="px-6 pt-20 pb-10 overflow-y-auto no-scrollbar text-gray-300 text-sm leading-relaxed space-y-4">
          
          <h2 className="text-lg font-semibold text-white">Privacy Policy</h2>
          <p className="opacity-70 text-xs">Last Updated: March 2024</p>

          <section>
            <h3 className="text-white font-medium mb-2">1. Introduction</h3>
            <p>
              Welcome to AI Palm Reader. We respect your privacy and are committed to protecting your personal data. 
              This policy explains how we handle your information when you use our application.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">2. Data Collection</h3>
            <p>
              <strong>Personal Information:</strong> We collect your name, date of birth, time of birth, and gender solely to generate personalized astrological readings. This data is stored locally on your device.
            </p>
            <p>
              <strong>Palm Images:</strong> Images you upload for palm reading are processed securely via our AI partner. We do not permanently store your palm images on our servers. They are discarded immediately after analysis.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">3. AI Processing</h3>
            <p>
              We use third-party AI services (OpenRouter) to generate readings. Anonymized data prompts are sent to these services. No personally identifiable information (PII) is shared with AI models beyond what is necessary for the reading (e.g., Zodiac sign).
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">4. Local Storage</h3>
            <p>
              Your profile, history, and preferences are stored in your device's local storage. You can clear this data at any time via the Settings menu.
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">5. Disclaimer</h3>
            <p>
              This app is for entertainment and spiritual reflection purposes only. The readings provided are not a substitute for professional medical, legal, or financial advice.
            </p>
          </section>

          <div className="pt-8 pb-4 text-center text-xs opacity-50">
            &copy; {new Date().getFullYear()} AI Palm Reader Team. All rights reserved.
          </div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default PrivacyPolicyScreen;
