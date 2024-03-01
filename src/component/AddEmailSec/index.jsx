import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const AddEmailSec = () => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (

    <Box
    sx={{
      flexWrap:"wrap",
      display:"flex",
      justifyContent:"space-evenly",
       padding:" 2rem 1rem",
       width: "100%",
       background: "#e34c5b",
       color:"#fff"

    }}
  >
    <Box
    sx={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}
    >
    <Typography 
    variant='h5'
    component={"p"}
    sx={{

    }}
    >
    Subscribe Our Newsletter

    </Typography>

    </Box>
    <Box 
    sx={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexWrap:"wrap",
      gap:".6rem"
    }}
    >
    <input type="email" placeholder="Enter your Email"  

        style={{
          padding: `${isSm? "1rem 4rem 1rem 1rem" :"1rem 14rem 1rem .5rem"}`,

border: "none",
        }}
    />
    <button type="submit" 
    style={{
      padding: `${isSm? "1rem 7rem" :".8rem 2rem"}`,
background: "#e34c5b",  
color: "#fff",
letterSpacing: "1.5px",
border: "1px solid #FFF",
outline: "none",
fontSize:" 1rem",

    }}
    >
    Submit
    </button>

    </Box>

  </Box>
  )
}

export default AddEmailSec
