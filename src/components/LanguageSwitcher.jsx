import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // Update current language when i18n language changes
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const languages = [
    { code: 'en', name: t('navbar.language_en') },
    { code: 'am', name: t('navbar.language_am') },
    { code: 'om', name: t('navbar.language_om') }
  ];

  const handleLanguageChange = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLang(languageCode);
      // Force a re-render of the component
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={currentLang}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        aria-label={t('navbar.select_language')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher; 