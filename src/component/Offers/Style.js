import styled from "@emotion/styled";
import { AppBar, List, Toolbar } from "@mui/material";
import { createGlobalStyle } from "styled-components";






export const GlobalStyle = createGlobalStyle`
  /* Include your style.css content here */
  .anime {
    animation-name: opacity;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  ${'' /* @keyframes opacity {
    0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
  } */}
`;


export const FadeBox = styled.div(({opacity})=>{
    return {

        overflow: "hidden",
        height: "100vh",
        position: "relative",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        zIndex: "-10000",
        transition:" opacity 0.4s",
        opacity: `${ opacity || 1}`,
    }
})
export const BackgroundBox = styled.div(({backgroundImage , idxChanged , zIndex})=>{
    return {

        animation: `${ (idxChanged ? 'opacity 3s infinite linear' : 'none')}`,
        visibility: `visible`,
        height: `100vh`,
        top: 0,
        left: 0,
        backgroundColor:" #dddd",
        position: "absolute",
        zIndex: `${zIndex || 0}`,
        backgroundSize: "cover",
        overflow: "hidden",
        width: "100%",
        padding: "10rem 10rem",
        backgroundPosition: "center",
        backgroundImage: `${ `url(${backgroundImage})`}`,
        backgroundPositionY: "top",
    }
})
export const StyledBullets = styled.div(({idx})=>{
    return {
      height:"3rem",
      width:"6rem",

      position:"absolute",
      bottom:"-5rem",
      left:"50%",
      transform:"translate(-50% , 0%)",

      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
    

      
    }
})

export const StyledBulletsSpan = styled.div(({idx , id})=>{
  const active = parseInt(idx) === parseInt(id)
    return {

   
        borderRadius:"50%",
        position:"relative",
        width:"1.5rem",
        height:"1.5rem",
        border:`${active  ? "2px solid #f56f" :  "2px solid #666"}`,
        backgroundColor:"transparent",     
        ':before':{
          position:"absolute",
        borderRadius:"50%",

          top:"50%",
          left:"50%",
          transform:"translate(-50% , -50%)",
          content:'""',
          width:"1rem",
          height:"1rem",
          backgroundColor:`${active ? "#f56f" : "#666"  }`
        }

      
    }
})




    





