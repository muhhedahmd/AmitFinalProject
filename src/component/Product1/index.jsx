import {
  Box,
  Button,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { } from "react";
import { Link, useParams } from "react-router-dom";
import {
  StyledDisc,
  StyledProduct,
  StyledProductHolder,
} from "../Products/Style";
// import { PATHS } from "../PATHS";
import { grey, pink } from "@mui/material/colors";
import { useCart } from "../Contexts/CartContext";
import { PATHS } from "../PATHS";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Favorite } from "@mui/icons-material";

const SingleCatagory = ({ Arr }) => {
  const { id } = useParams();
  const {  state, RemoveWishList, AddWishList } = useCart();


  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const Notifcation = (type, id, title, quantity) => {
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



  const HandleFav = (id, title) => {
    Notifcation("wishlist", id, title);
    const isEsist = state.wishlist.find((itemX) => itemX.id === id);

    if (isEsist) {
      RemoveWishList(id);
    } else {
      AddWishList(id);
    }
  };
  return (
    <Box>
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
            background: "#dededede",
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

        
          {
            Arr ? 
            
            Arr?.map((item, i) => {
            return (
              <StyledProduct
                sx={{
                  ":hover":{
                    boxShadow:" 5px 5px 0px #e1e1e1",

                      },
                      transition:".4s",
                  bgcolor: "#f7f7f7 !important",
                  padding: "1.5rem  .5rem !important",
                  // padding: `${isSm ? "0  0 0 0 !important" : ""}`,
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
                    padding: ".5rem 0",
                    bgcolor: grey[100],
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
                    padding: ".3rem",
                    bgcolor: "#fff",
                    flexDirection: "column",
                  }}
                  className="info"
                >
                  <ListItem
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyItems: "flex-start",
                      gap: ".5rem",
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
                          color: pink[500],
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

                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "0 !important",
                      width: "100% !important",
                      gap: ".4rem",
                    }}
                    className="StyledBtnBottom"
                  >
                    <Button
                    fullWidth
                    sx={{
                      transition:".3s",
                      ":hover":{

                      }
                    }}>
                    
                        <Favorite
                          onClick={() => HandleFav(item.id, item.title)}
                          sx={{
                      transition:".3s",

                            color: grey[800],
                            bgcolor: "#fff",

                            margin: "0 !important",
                            ":hover": {
                              color:pink[500],
                              bgcolor: "#fff",
                            },
                          }}
                        />
                    
                    </Button>
                  </ListItem>
                </Box>
              </StyledProduct>
            );
          })
          :
          <Box>

          <Typography
          >
          No Item in Wish List 
          Back to Home

          </Typography>
          <link
          to={PATHS.home}
          >

          </link>
          
          </Box>
          }
        </StyledProductHolder>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default SingleCatagory;
