import React, { useState, useRef } from "react";
import { Box, Divider, List, ListItem, Typography, useMediaQuery } from "@mui/material";
import TypeOfInfo from "./typeOfInfo";

const InfoSec = ({itemDataFromProduct}) => {
  const [selectedTab, setSelectedTab] = useState("DESCRIPTION");
  const arrayOfRefs = useRef({
    DESCRIPTION: React.createRef(),
    ADDITIONAL_INFO: React.createRef(),
    REVIEWS: React.createRef(),
  });
  // const isMd = useMediaQuery((theme) => theme.breakpoints.down('lg'))
const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const data = {
    DESCRIPTION: itemDataFromProduct.description,
    ADDITIONAL_INFO: {
      gender: "male",
      size: "xxl",
      price: "$"+Math.floor(itemDataFromProduct?.price - (itemDataFromProduct?.price * itemDataFromProduct?.discountPercentage) / 100),
      width: "10cm",
      height: "20cm",
      Catogry:itemDataFromProduct.category,
      brand:itemDataFromProduct.brand

    },
    REVIEWS: {
      REVIEWS_details: {
        Num1: {
          Num: "1",
          id: "1",
          AVATAR: "logo192.png",
          name: "AvatarTest",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, tempora! Sint inventore fugiat vitae accusantium minus? Animi dolorem odit praesentium delectus necessitatibus optio ",
        },
        Num2: {
          Num: "2",
          id: "2",
          AVATAR: "logo192.png",
          name: "AvatarTest",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, tempora! Sint inventore fugiat vitae accusantium minus? Animi dolorem odit praesentium delectus necessitatibus optio ",
        },
        Num3: {
          Num: "3",
          id: "3",
          AVATAR: "logo192.png",
          name: "AvatarTest",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, tempora! Sint inventore fugiat vitae accusantium minus? Animi dolorem odit praesentium delectus necessitatibus optio ",
        },
      },
      total: "3",
    },
  };

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <Box sx={{ padding: `${isSm ? "1rem 1rem" :"1rem 3rem"}` }}>
      <List sx={{ display: "flex", justifyContent: "flex-start", alignItems: "start", gap: "1.2rem" }}>
        {Object.keys(data).map((tabId) => (
          <ListItem
          disablePadding
            key={tabId}
            onClick={() => handleTabClick(tabId)}
            sx={{
              cursor: "pointer",
              width: "fit-content",
              borderBottom: selectedTab === tabId ? "2px solid #000" : "none",
            }}
          >
            <Typography variant="body1" 
            sx={{
              padding:"",
              fontSize:".9rem"
            }}
            
            >{tabId === "REVIEWS"? `${tabId} (${data.REVIEWS.total})`  :  tabId}</Typography>
          </ListItem>
        ))}
        <Divider />
      </List>

      {Object.keys(data).map((tabId) => (
        <List
        disablePadding
          key={tabId}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "start",
            gap: "1.2rem",
            position: "relative",
          }}
        >
          <ListItem
            ref={arrayOfRefs.current[tabId]}
            sx={{
              transition: ".4s",
              position: selectedTab === tabId ? "static" : "absolute",
              opacity: selectedTab === tabId ? 1 : 0,
              visibility: selectedTab === tabId ? "visible" : "hidden",
              backgroundColor: "transparent",
              width: "100%",
            }}
          >


          <TypeOfInfo itemDataFromProduct={itemDataFromProduct} type={tabId}  data={data[tabId]}/>
       
          </ListItem>
        </List>
      ))}
    </Box>
  );
};

export default InfoSec;
