import styled from "@emotion/styled";
import {  List, ListItem, Typography } from "@mui/material";

export const StyledProductHolder = styled(List)(({ theme }) => {
  return {
  [theme.breakpoints.down("sm")]:{

    padding: "0rem 2rem 0rem 0",
    justifyContent: "flex-start",
    alignItems: "center",
    },
    '@media(max-width: 375px)':{
      padding:"0",
      margin: "0 auto",
      width:" 100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    padding: "1rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))", // Adjusted to use rem units
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",

  };
});
// ... (previous imports)

export const StyledProduct = styled(List)(({ theme ,singlecatagory }) => {
  if(singlecatagory){
    return{
      overflow: "hidden",
      padding: "0",
      borderRadius: ".5rem",
      height: "auto",
      // boxShadow: "4px 2px 5px #ddd",
      position: "relative",
      display: "flex",
      justifyContent: "center", // Center the content horizontally
      alignItems: "center", // Center the content vertically
      flexDirection: "column",
      width: "100%", 
      maxWidth: "20rem", // Adjusted to use rem units
      margin: "1rem", // Add margin for spacing between items
      gap: ".5rem",
      textAlign:"center",
      img: {
        height: "auto",
        maxWidth: "90%",
      },
      li: {
        height:"fit-content",
        textAlign:"center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        listStyleType: "none",
        width: "fit-content",
      },

    }
  }
  else {

  return {
    ".wrapper-img": {
      height: "16rem",
    },
    "&:before": {
      transition: ".4s",
      visibility: "hidden",
      opacity: "0",
      position: "absolute",
      width: "100%",
      height: "59%",
      content: '""',
      top: "0",
      backgroundColor: "#5555551f",
      zIndex: "1",
    },

    "&:hover:before": {
      visibility: "visible ",
      opacity: "1 ",
    },

    ".info": {
      transition: ".3s",
      width: "100%",
      height: "50%",
      display: " flex",
      justifyContent: " center",
      alignItems: " center",
      flexDirection: " column",
      gap: ".5rem",
    },

    transition: ".4s",
    ":hover .info": {
      filter: "opacity(.3)",
    },

    ":hover .product-options-icons": {
      visibility: "visible",
      opacity: "1",
    },

    ":hover .StyledBtnBottom": {
      opacity: "1 !important",
      bottom: "0",
    },

    overflow: "hidden",
    padding: "1rem",
    borderRadius: ".5rem",
    height: "22rem",
    border: "1px solid #dedede",
    boxShadow: "4px 2px 5px #ddd",
    position: "relative",
    display: "flex",
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Center the content vertically
    flexDirection: "column",
    width: "100%", 
    maxWidth: "20rem", // Adjusted to use rem units
    margin: "1rem", // Add margin for spacing between items
    gap: ".5rem",
    img: {
      height: "auto",
      maxWidth: "70%",
    },
    li: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
      listStyleType: "none",
      width: "fit-content",
    },
  };
  }
});

export const StyledDisc = styled(Typography)(({lineBreak = 1}) => {
  return {
    width:"100%",
    textAlign: "center",
    display: "-webkit-box",
    WebkitLineClamp: lineBreak,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: 1.5,
  };
});

export const StyledBtnBottom = styled(ListItem)(({ theme }) => {
  return {
    transition: ".4s",
    position: "absolute",
    bottom: "-4.5rem",
    width: "16rem",
    opacity: "0",
    button: {
      backgroundColor: "#f56f",
      color: "#fff",
      width: "11rem !important",
    },
  };
});

export const ProductOptionsIconsList = styled(List)(({ theme }) => {
  return {
    transitionDelay: ".5s",
    transition: ".3s",
    transitionTimingFunction: "ease-in-out",
    opacity: "0",
    visibility: "hidden",

    zIndex: "2",
    left: "50%",
    top: "30%",
    transform: "translate(-50% ,-50%)",
    position: "absolute",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    svg: {
      transition: ".3s",
      color: "#f56f",
    },

    li: {
      transition: ".3s",

      width: "3rem !important",
      height: "3rem",
      background: "#fff",
      borderRadius: "50%",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "li:hover": {
      backgroundColor: "#f56f",
    },

    "li:hover svg": {
      color: "#fff",
    },
  };
});
