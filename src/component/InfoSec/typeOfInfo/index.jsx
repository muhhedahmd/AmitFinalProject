import { Avatar, Box, Divider, List, ListItem, Paper, Rating, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

const TypeOfInfo = ({ type  , data  , itemDataFromProduct}) => {
  return (
    
    <ListItem

    disablePadding
     sx={{
      overflowX:"auto",
        
        padding:`${type === "DESCRIPTION"? "1rem" :0}`,
        width: "fit-content",
        border: "1px solid #ebebeb",
        
    }}>
      {type === "ADDITIONAL_INFO"  ? (
        <TableContainer component={Paper}
        
        >
          <table  sx={{ Width: "fit-content" }} aria-label="simple table">
          <TableHead>
          <TableRow>
          {Object.keys(data).map((item)=>{
            return (
            <TableCell align="right">{item}</TableCell>

            )
          })}
          </TableRow>
        </TableHead>
            <TableBody>
            <TableRow
   
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {Object.keys(data).map((row) => (
              <TableCell component="th" scope="row">
                {data[row]}
              </TableCell>
       
          ))}

            </TableRow>
            </TableBody>

          </table>
        </TableContainer>
      ) : type === "DESCRIPTION" ? (
        
          <Typography
          
           variant="h6" component={"p"} 
           sx={{
            fontSize:".9rem"
           }}
           >
         {data}


          </Typography>


      ) : (<>

        <List>

            <Typography variant="body2" component={"p"} sx={{
              color:"#444"
              ,fontSize:"1.2rem"
            }}>
           You have {3} reviews for {itemDataFromProduct.title}
            </Typography>
        {Object.keys(data.REVIEWS_details).map((item , i )=>{

          return (
            <>

          <ListItem key={data.REVIEWS_details[item].id}>
         
          <Box m={"0 .6rem 0  0"} sx={{
            display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
          }}>
            <Avatar sx={{
              textAlign:"center",
              background:"transparent"
            }}>
          <img style={{
            Width:"38px"
          }} src={data.REVIEWS_details[item].AVATAR} alt="" />
                            
            </Avatar>
          <Typography variant="body1" sx={{
            fontSize:".8rem", 
            color:"#444",
            textAlign:"center",
            margin:".5rem "
          }} component={"p"}>
          {data.REVIEWS_details[item].name}

          </Typography>

          </Box>
          <Box
            sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"flex-start",
              flexDirection:"column"

            }}
          >

          <Rating 
          sx={{
            alignSelf:"flex-end"
          }}
           name="read-only" value={itemDataFromProduct?.rating?.rate} readOnly />

          <Typography variant="body2" component={"p"}>
          {data.REVIEWS_details[item].details}
          </Typography>

          </Box>
          
          </ListItem>
            
            {
              
              
              i <  Object.keys(data.REVIEWS_details).length-1 ?
            <Divider/>
            
             :""
}
            </>


          )
        })}
        </List>


      </>)}


      
    </ListItem>
  );
};

export default TypeOfInfo;
