import React, { useEffect } from 'react';
import Header from './component/Header/index'
import UseRouter from './component/MYRoute';
import {  useCart } from './component/Contexts/CartContext';
import Footer from './component/Footer';
import UseGetproduct from './component/Hooks/UseProduct';
import axios from 'axios';
import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export default function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: pink[500],
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });

  const  {SetAllItems ,state}= useCart()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products").then((res)=>{

          SetAllItems (res.data.products) 
          // console.log(res , "res")
        })
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
    
  }, []); 


  return (
    <ThemeProvider theme={theme} >


    <div className="App">
    
      <UseRouter />
    </div>

    </ThemeProvider>
      
  );
}
