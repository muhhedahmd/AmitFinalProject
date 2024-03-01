import { CssBaseline, List, ListItem } from "@mui/material";
import React from "react";
import SimpleCatagory from "./SimpleCatagory";

const NestedCatagorie = ({ item }) => {
  return (
    <>
      <CssBaseline />
      <List
        className="drop-down-menu-nested"
        sx={{
          background: "#fff",
          transition: ".3s",
          opacity: "0",
          visibility: "hidden",
          width: "max-content",
          transform: "translate(-50%, -50%)",
    left: "50%",
    top:" 14rem",          position: "fixed",
          display: "flex",
          flexDirection: " row",
          alignItems: "flex-start",
    justifyContent: "flex-start",
    zIndex:"11111"
        }}
      >
        {Object.keys(item).map((key, index) => {
          return (
            <ListItem
            sx={{borderRight:"1px solid #3344" , height:"100%"}}
              key={index}
              disableGutters
              disablePadding
            className="inner-nested"


            >
              <h5 style={{padding:" 0 2rem" , fontWeight:"bold" , fontSize:"1.1rem !important"}} >{key}</h5>
              <SimpleCatagory  col={true} notHover={true} item={item[key]} />
              
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default NestedCatagorie;
