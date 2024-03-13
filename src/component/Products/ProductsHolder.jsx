import React from 'react'
import { ProductOptionsIconsList, StyledBtnBottom, StyledDisc, StyledProduct, StyledProductHolder } from './Style';
import { Link } from 'react-router-dom';
import { Box, Divider, ListItem, Rating, Typography } from '@mui/material';
import { PATHS } from '../PATHS';
import { grey, pink } from '@mui/material/colors';
import { useCart } from '../Contexts/CartContext';
import { Bounce, toast } from 'react-toastify';

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import OfferBtn from '../OfferBtn';
import { formatCurrency } from '../../utils/Currancy';

const ProductsHolder = ({data ,loadMore }) => {
    const { AddToCart, AddWishList, state } = useCart();

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
                toast.info(`${title} Is already in wish list`, {
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
  return (
    <>

    <StyledProductHolder>
    {data.map((item, i) =>
      i <= loadMore ? (
        <StyledProduct key={item.id}>
          <ListItem
            className="wrapper-img"
            width="100%"
            sx={{
              height: "18rem",
            }}
          >
           
            
              <img
                style={{
                  objectFit: "cover",
                  height: "8rem",
                  width: "8rem",
                  overflow: "initial",
                }}
                loading="lazy"
                src={item.thumbnail}
                alt="img"
              />
            
          </ListItem>
          <Divider
            variant="fullWidth"
            style={{
              background: "#ddd",
              width: "122%",
              margin: "0 0 .4rem 0",
            }}
            component="div"
          />
          <Box className="info">
            <ListItem disablePadding>
              
                <Rating
                  name="read-only"
                  loading="lazy"
                  value={Math.round(item.rating)}
                  readOnly
                />
              
            </ListItem>

            <ListItem disablePadding>
              <StyledDisc
                variant="subtitle1"
                color="text.secondary"
                loading="lazy"
              >
                {item.title}
              </StyledDisc>
            </ListItem>
            <ListItem disablePadding>
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
                  variant="body1"
                  component={"p"}
                  loading="lazy"
                >
                  {item.discountPercentage}% off
                </Typography>
              </Box>
            </ListItem>
          </Box>

          <ProductOptionsIconsList className="product-options-icons">
            <ListItem
             
              sx={{
                cursor: "pointer",
              }}
              role="button"
              TouchRippleProps={{
                center: true,
                color: "rgba(0, 0, 0, 0.2)",
                timeout: 500,
              }}
            >
              <ZoomInIcon fontSize="large" />
            </ListItem>

            <ListItem
              sx={{
                cursor: "pointer",
              }}
              role="button"
              onClick={() => {
                Notifcation("wishlist", item.id , item.title , item.quantity);
                AddWishList(item.id);
              }}
            >
              <FavoriteBorderIcon
                sx={{
                  cursor: "pointer",
                }}
                fontSize="large"
              />
            </ListItem>

            <ListItem>
              <Link to={`${PATHS.SingleProduct}/${item.id}`}>
                <ShuffleIcon fontSize="large" />
              </Link>
            </ListItem>
          </ProductOptionsIconsList>

          <StyledBtnBottom
            onClick={() => {
                const qty = state.cartItems.find((itemx) => itemx.id === item.id  ) ? state.cartItems.find((itemx) => itemx.id === item.id  ).quantity + 1
     : null

                console.log(qty)

              Notifcation("cart", item.id , item.title ,qty );
              AddToCart(
                item.id,
                formatCurrency(
                  item?.price -
                    (item?.price * item?.discountPercentage) / 100
                ),
                1,
                item.thumbnail,
                item.title,
                item.stock
              );
            }}
            className="StyledBtnBottom"
          >
            <OfferBtn>Add to cart</OfferBtn>
          </StyledBtnBottom>
        </StyledProduct>

      ) : (
        ""
      )
    )}
  </StyledProductHolder>
  </>

  )
}

export default ProductsHolder