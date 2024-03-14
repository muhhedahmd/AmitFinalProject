import {
  Box,
  Button,
  ListItem,

  Typography,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import {
  StyledDisc,
  StyledProduct,
  StyledProductHolder,
} from "../Products/Style";
// import { PATHS } from "../PATHS";
import { grey, pink } from "@mui/material/colors";
import { useCart } from "../Contexts/CartContext";
import Footer from "../Footer";
import { PATHS } from "../PATHS";
import { Bounce, ToastContainer, toast } from "react-toastify";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";

const SingleCatagory = () => {
  const { id } = useParams();
  const { AddToCart , state  , RemoveWishList, AddWishList} = useCart();

  const [Data, SetData] = useState([]);

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  const Notifcation = (type, id ,title , quantity) => {
    if (type === "wishlist") {
      const isExist = state.wishlist.some((item) => item.id === id);
      if (!isExist) {
        const toasts = () =>
          toast.success(`${title} Added To wish list`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        toasts();
      } else if (isExist) {
        const toasts = () =>
          toast.info(`${title} removed from wish list`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        toasts();
      }
    }
    if (type === "cart") {
      const isExist = state.cartItems.some((item) => item.id === id);
      if (!isExist) {
        const toasts = () =>
          toast.success(`${title} Added To cart`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        toasts();
      } else if (isExist) {
        const toasts = () =>
          toast.info(`you have now ${quantity} of ${title}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        toasts();
      }
    }
  };

  const HandleAddtoCart = ( id, price , discountPercentage , thumbnail , title , stock)=>{
    const qty = state.cartItems.find((itemx) => itemx.id === id  ) ? state.cartItems.find((itemx) => itemx.id === id  ).quantity + 1
    : null
    Notifcation("cart" , id , title ,qty )
    AddToCart(
      id,
     
        price -
          (price * discountPercentage) / 100
      ,
      1,
      thumbnail,
      title,
      stock
    );

  } 

const HandleFav= (id , title)=> {
  Notifcation("wishlist" , id ,title  )
  const isEsist =state.wishlist.find((itemX)=>itemX.id === id ) 

  if(isEsist){
    
    RemoveWishList(id)
  }
  else {
      AddWishList(id)

    }
       
  
    

}
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
      <Header />

      <Box
        sx={{
          margin: "2rem 1rem 4rem 1rem",
        }}
      >
        <Typography
          variant="h4"
          component={"div"}
          sx={{
            color: `${pink[500]}`,
            padding: ".5rem",
            background: "#fefefefe",
            width: "fit-content",
          }}
        >
          {id}
        </Typography>

        <StyledProductHolder
          sx={{
            width: "100% !important",
            padding: "1rem 0 !important",
          }}
        >
          {Data.map((item, i) => {
            return (
              (
            <StyledProduct
            quantity={
state.cartItems.find((itemx) => itemx.id === item.id  ) ? state.cartItems.find((itemx) => itemx.id === item.id  ).quantity 
     : null



            }
              sx={{
                padding: `${isSm ? "0  0 0 0 !important" : ""}`,
                margin: `${isSm ? "0  -1rem  0 0 !important" : ""}`,
              }}
              singlecatagory={true}
              key={item.id}
            >
              <ListItem
                className="wrapper-img"
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  height: "18rem",
                  padding:".5rem 0",
                  bgcolor:grey[100],
                }}
              >
                <img
                  style={{
                    objectFit: "cover",
                    height: "9rem",
                    width: "100%",
                    overflow: "initial",
                  }}
                  loading="lazy"
                  src={item.thumbnail}
                  alt="img"
                />
              </ListItem>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: ".1rem 0 ",
                  flexDirection: "column",
                }}
                className="info"
              >
     

                <ListItem
                  sx={{
                    width: "100%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start",
                    justifyItems:"flex-start",
                    gap:".5rem",
                  }}
                  disablePadding
                >


                  <StyledDisc
                    align="center"
                    variant="caption"
                    color="text.secondary"
                    loading="lazy"
                  >
                    <Link
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      to={`${PATHS.SingleProduct}/${item.id}`}
                    >
                      {item.description}
                    </Link>

                  </StyledDisc>
                
                  <StyledDisc
                    align="center"
                    variant="subtitle1"
                    color="text.secondary"
                    loading="lazy"
                  >
                    <Link
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      to={`${PATHS.SingleProduct}/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </StyledDisc>

                </ListItem>
        
              </Box>

              <ListItem
                sx={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center",
                  margin: "0 !important",
                  width:"100% !important",
                  gap:".4rem",

                }}
       
                className="StyledBtnBottom"
              >
                <Button
                fullWidth
                         onClick={() =>HandleAddtoCart(item.id , item.price , item.discountPercentage , item.thumbnail  , item.title , item.stock)}
                  sx={{
                    bgcolor: grey[200],
                    flex:"1",
                    color: grey[700],
                    margin: "0 !important",
                    ":hover": {
                      bgcolor: "#fff",

                    },
                  }}
                >
                  <AddShoppingCartIcon
                  sx={{
                    fill:pink[500]
                  }}
                  />
                </Button>

                <Button
            onClick={()=>HandleFav(item.id , item.title)}

                  sx={{

                    color: grey[800],
                      bgcolor: grey[200],
                    margin: "0 !important",
                    ":hover": {
                      bgcolor: grey[200],
                    },
                  }}
                >

                  {
                    state.wishlist.find((itemX)=>itemX.id === item.id ) ? 
                    <Favorite/> : 

                  <FavoriteBorder/>
                  }

                </Button>

              </ListItem>
            </StyledProduct>
          )

            )
          }
          
         
            )}
        
          
        </StyledProductHolder>
        
      </Box>


      <Footer />

      <ToastContainer />
    </Box>
  );
};

export default SingleCatagory;
