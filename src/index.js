import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter  } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { AuthProvider } from './component/Contexts/Authenticated.jsx';
import { CartProvider } from './component/Contexts/CartContext.jsx';
import ScrollToTop from './component/ScrollToTop.jsx';


const theme= createTheme()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<BrowserRouter> 
<ThemeProvider theme={theme}>
<AuthProvider>
<CartProvider>
<ScrollToTop/>
<App/> 

</CartProvider>

</AuthProvider>
</ThemeProvider>
 </BrowserRouter>
  );

