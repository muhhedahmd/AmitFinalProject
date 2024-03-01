import React, { useEffect, useState } from 'react';
import { offers } from '../../Data/data';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { BackgroundBox, FadeBox, GlobalStyle, StyledBullets, StyledBulletsSpan,  } from './Style';
import './style.css'
import OfferBtn from '../OfferBtn';



const Offers = () => {
const intervalId = setInterval(()=>{},3000)
const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (idx < 2) {
        setIdx((prev) => prev + 1);
      } else {
        setIdx(0);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [idx]);


  const bulletClick =(e)=>{

    const {id} = e.target
    setIdx(parseInt(id))


    return       clearInterval(intervalId);

  }

  return (
    <Box 
    sx={{
      maxHeight:"100vh"
    }}
    >
      <GlobalStyle  />
      <FadeBox  opacity={1}>
        <BackgroundBox
        backgroundImage={Object.values(offers)[idx].img}  idxChanged={ idx}  zIndex={Object.values(offers)[idx].id - 1}

          className='anime'

        >

        <Box  sx={{
position: "absolute",
  top: "10rem",
  left: `${isSm ? "1rem" : "5rem"}`,
        }}>

          <Typography
          style={{
               
                  fontSize:"5rem" , 
                  fontWeight:"bold",
          }}
          >
          
          
          {Object.values(offers)[idx].heddding? Object.values(offers)[idx].heddding: "NEW TRENDING"}</Typography>
          <Typography 
            style={{fontSize:"1.1rem" , fontWeight:"bold" , margin:"0 0  .25rem 0 "}}
            fontWeight="bold">{Object.values(offers)[0].title}</Typography>
          <Typography
            style={{fontSize:"1.1rem" , fontWeight:"normal" ,width:`${isSm ? "auto" :"30rem"}` }}
          margin="1rem 0">
            {Object.values(offers)[idx].dicription}
          </Typography>

          <OfferBtn className='OfferBtn' >
          Shop now
          </OfferBtn>



        </Box>
        </BackgroundBox>
      </FadeBox>
      <StyledBullets idx={idx}  className="bullets">

        <StyledBulletsSpan 
                onClick={(e)=>bulletClick(e)}

        
         id='0' idx={idx}  >

        </StyledBulletsSpan>
        <StyledBulletsSpan id="1"  idx={idx} 
                onClick={(e)=>bulletClick(e)}


        
        
        >
          
        </StyledBulletsSpan>
        <StyledBulletsSpan id='2'  idx={idx}
    onClick={(e)=>bulletClick(e)}

        
         >

        </StyledBulletsSpan>

      </StyledBullets>
    </Box>
  );
};

export default Offers;

