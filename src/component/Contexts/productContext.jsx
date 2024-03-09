import{ createContext,  } from 'react';

const ProductContext = createContext(null);

export const AuthProvider = ({ children }) => {
 

  return (
    <ProductContext.Provider value={{  }}>
      {children}
    </ProductContext.Provider>
  );
};

