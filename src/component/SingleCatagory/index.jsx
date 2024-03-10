import { Box, Button, ListItem, Rating, Skeleton, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import {  StyledDisc, StyledProduct, StyledProductHolder } from "../Products/Style";
// import { PATHS } from "../PATHS";
import { grey, pink } from "@mui/material/colors";
import { useCart } from "../Contexts/CartContext";
import Footer from "../Footer";
import { PATHS } from "../PATHS";
import { ToastContainer, toast } from "react-toastify";

const SingleCatagory = () => {
  const { id } = useParams();
  const {AddToCart} =useCart()

  const [Data, SetData] = useState([]);
  const  [isLoading ]  = useState(false)
  const isSm = useMediaQuery((theme)=> theme.breakpoints.down("sm"))
  const notify = () => toast("Wow so easy !");

  useEffect(() => {
    const fetchData = async () => {
      const newDataArray = []; // Initialize as an array

      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${id}`
        );
        const categoryData = response.data.products;
        newDataArray.push(...categoryData); // Push each categoryData array into newDataArray
      } catch (err) {
        console.error("Error fetching category data:", err);
      }

      SetData(newDataArray);
    };

    fetchData();
  }, [id]);

  return (
    <Box>
    <Header/>
    
        <Box
        sx={{
          margin:"2rem 1rem 4rem 1rem"
        }}
        >
      <Typography
      variant="h4"
      component={"div"}

      sx={{
        color:`${pink[500]}`,
        padding:".5rem",
        background:"#fefefefe",
        width:"fit-content",


      }}
      >
      {id}
 

      </Typography>

          <StyledProductHolder 
            sx={{
              width:"100% !important",
              padding:"1rem 0 !important"
            }}
          >
              {Data.map((item, i) =>
             
                  <StyledProduct
                  sx={{
                    padding:`${isSm ?  "0  0 0 0 !important" : "" }`,
                    margin:`${isSm ?  "0  -1rem  0 0 !important" : "" }` ,
                  }}
                  singlecatagory={true}
                  
                   key={item.id}>
                    <ListItem
                      className="wrapper-img"
                      sx={{
                      width:"100%",
                        overflow:"hidden",
                        height: "18rem",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton
                          component="div"
                          variant="rectangular"
                          sx={{
                            width: "16rem",
                            height: "100%",
                            bgcolor: "#666",
                          }}
                        />
                      ) : (
                        <img
                          style={{
                            objectFit: "cover",
                            height: "13rem",
                            width: "13rem",
                            overflow: "initial",
                          }}
                          loading="lazy"
                          src={item.thumbnail}
                          alt="img"
                        />
                      )}
                    </ListItem>
                   
                    <Box 
                    sx={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      m:".1rem 0 ",
                      flexDirection:"column",
                    }}
                    
                    className="info">
                      <ListItem
                          sx={{
                        width:"100%"
                      }}
                       disablePadding>
                        {isLoading ? (
                          <Skeleton
                            component="div"
                            variant="text"
                            width={"16rem"}
                            height={""}
                            sx={{
                              bgcolor: "#666",
                            }}
                          />
                        ) : (
                          <Rating
                              sx={{
                        width:"100%",
                        textAlign:"center",
                      }}
                            name="read-only"
                            loading="lazy"
                            value={Math.round(item.rating)}
                            readOnly
                          />
                        )}
                      </ListItem>

                      <ListItem
                      sx={{
                        width:"100%"
                      }}
                       disablePadding>
                        {isLoading ? (
                          <Skeleton
                            component="div"
                            variant="text"
                            width={"16rem"}
                            height={""}
                            sx={{
                              bgcolor: "#666",
                            }}
                          />
                        ) : (
                          <StyledDisc
                          align="center"
                            variant="subtitle1"
                            color="text.secondary"
                            loading="lazy"
                          >
                    <Link 
                    style={{
                      color:"inherit",
                      textDecoration:"none",
                    }}
                    to={`${PATHS.SingleProduct}/${item.id}`}>
                            {item.title}

                          </Link>
                          </StyledDisc>
                        )}
                      </ListItem>
                      <ListItem disablePadding>
                        {isLoading ? (
                          <Skeleton
                            width={"12rem"}
                            height={"2rem"}
                            sx={{
                              bgcolor: "#666",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <Typography
                              variant="body1"
                              component={"p"}
                              sx={{
                                fontSize: "1.199rem",
                                color: pink[500],
                              }}
                              loading="lazy"
                            >
                              {Math.floor(
                                item?.price -
                                  (item?.price * item?.discountPercentage) / 100
                              )}
                              $
                            </Typography>
                            <Typography
                              variant="body1"
                              component={"p"}
                              sx={{
                                color: grey[500],
                                textDecoration: "line-throw",
                              }}
                              loading="lazy"
                            >
                              {item.price}$
                            </Typography>
                            <Typography
                              sx={{
                                color: pink[400],
                              }}
                              variant="caption"
                              component={"p"}
                              loading="lazy"
                            >
                              {item.discountPercentage}% off
                            </Typography>
                          </Box>
                        )}
                      </ListItem>
                    </Box>

                
                    <ListItem
                    sx={{
                      margin:"0 !important"
                    }}
                      onClick={() =>
                      {

                        
                        AddToCart(
                          item.id,
                          Math.floor(
                            item?.price -
                              (item?.price * item?.discountPercentage) / 100
                          ),
                          1,
                          item.thumbnail,
                          item.title,
                          item.stock
                        )
                        return notify
                      }
                      }
                      className="StyledBtnBottom"
                    >
                      <Button
                       sx={{
                        bgcolor:pink[400],
                        color:grey[100],
                        width:"100%",
                      margin:"0 !important",
                      ':hover':{
                        bgcolor:pink[300],
                          
                      }

                    }}
                      >Add to cart</Button>
                    </ListItem>
                    
                  </StyledProduct>
           
                
              )}
            </StyledProductHolder>
        </Box>

<Footer/>

<ToastContainer />
    </Box>
  );
};

export default SingleCatagory;
