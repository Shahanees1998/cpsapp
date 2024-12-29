import React, { createContext, useState, useContext } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isScroll, setIsScroll] = useState(false);

  const toggleScroll = () => {
    setIsScroll(prev => !prev);
  };

  const texts = language === 'fr' ? fr : language === 'es' ? es : en;

  return (
    <LanguageContext.Provider value={{ texts, setLanguage,language, isScroll, toggleScroll }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 