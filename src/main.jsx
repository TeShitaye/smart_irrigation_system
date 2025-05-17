import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
//import './i18n'; // Import i18n configuration

const initializeTheme = () => {
  try {
    document.documentElement.classList.remove('light', 'dark');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  } catch (error) {
    console.error('Theme initialization failed:', error);
    document.documentElement.classList.add('light'); // Fallback
  }
};

// Initialize theme
initializeTheme();

// Initialize language
const initializeLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (!savedLanguage) {
      // Set default language based on browser language or fallback to English
      const browserLang = navigator.language.split('-')[0];
      const supportedLangs = ['en', 'am', 'om'];
      const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
      localStorage.setItem('i18nextLng', defaultLang);
    }
  } catch (error) {
    console.error('Language initialization failed:', error);
    localStorage.setItem('i18nextLng', 'en'); // Fallback to English
  }
};

initializeLanguage();
console.log('Rendering App...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);