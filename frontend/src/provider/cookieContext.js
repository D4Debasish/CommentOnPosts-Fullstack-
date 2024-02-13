import React, { createContext, useContext, useState } from 'react';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookie, setCookie] = useState('');

  return (
    <CookieContext.Provider value={{ cookie, setCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};
