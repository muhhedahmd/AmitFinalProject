import axios from 'axios';
import{ createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext(null);

export const AuthProvider = ({ children }) => {
 

  return (
    <ProductContext.Provider value={{  }}>
      {children}
    </ProductContext.Provider>
  );
};

