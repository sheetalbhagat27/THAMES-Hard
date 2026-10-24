import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [activeSpecProduct, setActiveSpecProduct] = useState(null);

  return (
    <QuoteContext.Provider
      value={{
        items: [],
        totalItems: 0,
        isOpen: false,
        setIsOpen: () => {},
        addItem: () => {},
        removeItem: () => {},
        updateQty: () => {},
        clearAll: () => {},
        generateWhatsAppMessage: () => '',
        activeSpecProduct,
        setActiveSpecProduct,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export const useQuote = () => useContext(QuoteContext);
