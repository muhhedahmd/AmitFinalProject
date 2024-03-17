import {
  Box,
  Divider,
  List,
  ListItem,
  Rating,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../Contexts/CartContext";
import InfoSec from "../InfoSec";
import AddEmailSec from "../AddEmailSec";
import GetSingleProduct from "../Hooks/GetSingleProduct";
import axios from "axios";
import { PATHS } from "../PATHS";
import {
  ProductOptionsIconsList,
  StyledBtnBottom,
  StyledDisc,
  StyledProduct,
  StyledProductHolder,
} from "../Products/Style";
import { grey, pink } from "@mui/material/colors";
import OfferBtn from "../OfferBtn";
import CounterOfThequantitiy from "../CounterOfThequantitiy";
import Header from "../Header";
import Footer from "../Footer";

const SingleProduct = () => {
  const { AddToCart   ,AddWishList} = useCart();

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { id } = useParams();
  const [item, setItem] = useState({});
  const { memoizedData } = GetSingleProduct(
    `https://dummyjson.com/products/${id}`
  );
  const [image, setImage] = useState(item.thumbnail);

  useEffect(() => {
    setItem(memoizedData);
    setImage(() => item.thumbnail);
  }, [item.img, item.thumbnail, memoizedData]);

  const HandleImageClick = (e, img) => {
    setImage(img);
  };

  const [data, SetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${item.category}`
        );
        if (response.status === 200) SetData(response.data.products);
      } catch (err) {
        console.error("Error fetching category data:", err);
      }
    };
    fetchData();
  }, [item.category]);

  const counterRef = useRef();
  const [ ,setCounterState] = useState(counterRef) 
  

  useEffect(()=>{
    setCounterState(counterRef.current.getCounterState())
  },[])


  return (<>

    <Header/>
    <Box>
      <List
        style={{
          display: "flex",
          flexDirection: `${isSm ? "column" : "row"}`,
          padding: `${isMd ? "5rem 0 " : "5rem  10rem"}`,
        }}
      >
        <Box
          sx={{
            maxWidth: `${isSm ? "100%":"64%" }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: `${!isSm ? "100%" : "96%"}`,
          }}
        >
          <ListItem
            style={{
              borderRadius: "10px",
              padding: `${!isSm ? "6rem" : "2rem 0"}`,
              border: "1px solid #9999",
              justifyContent: "center",
              alignItems: "center",
              // height: "",
              maxWidth: `${!isSm ? "50vw" : "96%"}`,
              width: `${!isSm ? "100%" : "96%"}`,
              height: `${isSm ? "23rem" : "25rem"}`,
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  maxHeight: "20rem",
                  width: `${isSm ? "20rem" : "100%"}`,
                }}
                src={!image ? item?.thumbnail : image}
                alt=""
              />
            </Box>
          </ListItem>
          <Box
            sx={{
              display: "flex",
              padding: "0 0.5rem 0 1rem",
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            {item?.images?.map((img, i) => {
              return (
                <Box
                  onClick={(e) => HandleImageClick(e, img)}
                  sx={{
                    padding: "1rem 2rem",

                    border: `${
                      !(img === image) ? "1px solid #999" : "1px solid #ff536a"
                    }`,
                    width: " fit-content",
                    margin: ".5rem .5rem .5rem 0",
                    borderRadius: "6px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "5rem",
                      maxHeight: "5rem",
                    }}
                    src={img}
                    alt={`img${i}`}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        <List disablePadding>
          <ListItem
            sx={{
              paddingTop: "0",
            }}
          >
            <Typography variant="h6" component={"h6"}>
              {item?.title}
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Price :
              <Typography
                sx={{
                  color: "#ff536a",
                }}
                variant="p"
                component={"p"}
              >
                ${item?.price - (item?.price * item?.discountPercentage) / 100}
              </Typography>
              <Typography
                style={{
                  margin: "0  .5rem  0 .8rem ",
                  textDecoration: "under-line",
                }}
              >
                ${item?.price}
              </Typography>
              <Typography
                sx={{
                  color: "#2bd133",
                }}
                variant="caption"
                component={"span"}
                style={{ fontSize: ".8rem" }}
              >
                %{item?.discountPercentage}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Rating
                name="read-only"
                value={Math.round(item.rating)}
                readOnly
              />
              <Typography>InStock {item.stock}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Typography style={{ color: "#777" }} variant="p" component={"p"}>
              {item?.description}
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <List disablePadding>
              <ListItem
                sx={{
                  gap: ".5rem",
                }}
              >
                <HealthAndSafetyIcon
                  fontSize="small"
                  sx={{ color: "#ff536a" }}
                />
                1 Year AL Jazeera Brand Warranty
              </ListItem>
              <ListItem
                sx={{
                  gap: ".5rem",
                }}
              >
                <PublishedWithChangesIcon
                  fontSize="small"
                  sx={{ color: "#ff536a" }}
                />
                30 Day Return Policy
              </ListItem>
              <ListItem
                sx={{
                  gap: ".5rem",
                }}
              >
                <MonetizationOnIcon
                  fontSize="small"
                  sx={{ color: "#ff536a" }}
                />
                Cash on Delivery available
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <Typography
              sx={{
                marginRight: "1rem",
              }}
              variant="body2"
              component={"p"}
            >
              Color:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
              classNamx="colorHolder"
            >
              <Box
                sx={{
                  boxShadow: "1px 3px 5px #888888",
                  borderRadius: "50%",
                  width: "1.4rem",
                  height: "1.4rem",
                  backgroundColor: pink[500],
                  border: " 2px solid #fff",
                }}
              ></Box>

              <Box
                sx={{
                  borderRadius: "50%",
                  border: " 2px solid #fff",
                  width: "1.4rem",
                  height: "1.4rem",
                  backgroundColor:  pink[500],
                }}
              ></Box>

              <Box
                sx={{
                  border: " 2px solid #fff",

                  borderRadius: "50%",
                  width: "1.4rem",
                  height: "1.4rem",
                  backgroundColor:  pink[500],
                }}
              ></Box>
            </Box>
          </ListItem>

          <ListItem>
            <Typography
              sx={{
                marginRight: "1rem",
              }}
              variant="body2"
              component={"p"}
            >
              Size:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
              classNamx="colorHolder"
            >
              <Box
                sx={{
                  border: " 1px solid #99999999",

                  padding: ".7rem",
                  width: "1.4rem",
                  height: "1.4rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
              >
                XS
              </Box>

              <Box
                sx={{
                  border: " 1px solid #99999999",

                  padding: ".7rem",

                  width: "1.4rem",
                  height: "1.4rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color:pink[500]
                }}
              >
                S
              </Box>

              <Box
                sx={{
                  border: " 1px solid #99999999",

                  padding: ".7rem",

                  width: "1.4rem",
                  height: "1.4rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                M
              </Box>

              <Box
                sx={{
                  border: " 1px solid #99999999",
                  padding: ".7rem",

                  width: "1.4rem",
                  height: "1.4rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L
              </Box>
              <Box
                sx={{
                  border: " 1px solid #99999999",

                  padding: ".7rem",

                  width: "1.4rem",
                  height: "1.4rem",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                XL
              </Box>
            </Box>
          </ListItem>

          <ListItem>
            <Divider
              variant="fullWidth"
              style={{
                background: "#ddd",
                width: "94%",
                margin: "1rem",
              }}
              component="div"
            />
          </ListItem>

          <CounterOfThequantitiy ref={counterRef} item={item} />
          
          <ListItem>
            <button
              style={{
                cursor: "pointer",
                color: "#fff",
                background: " #ff1d3b",
                border: "none",
                padding: ".5rem 1rem",
                display: "flex",
                justifyContent: " center",
                alignItems: "center",
                gap: ".5rem",
                borderRadius: "0.4rem",
                fontSize: "1rem",
              }}
              onClick={() =>
                AddToCart(
                  item?.id,
                  item?.price - (item?.price * item?.discountPercentage) / 100,
                  counterRef?.current.getCounterState(),
                  item?.thumbnail,
                  item?.title,
                  item?.stock,
                 
                )
              }
              className="add-to-cart"
            >
              <AddShoppingCartIcon fontSize=".8rem" />
              Add to cart
            </button>
          </ListItem>
          <ListItem>
            <Divider
              variant="fullWidth"
              style={{
                background: "#ddd",
                width: "94%",
                margin: "1rem",
              }}
              component="div"
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                gap: ".5rem",
              }}
              variant="body2"
              component={"p"}
            >
              SKU:
              <Typography
                sx={{
                  color: "#666",
                }}
                variant="body2"
                component={"p"}
              >
                BE45VGRT
              </Typography>
            </Typography>

            <Typography
              sx={{
                display: "flex",
                gap: ".5rem",
              }}
              variant="body2"
              component={"p"}
            >
              Category:
              <Typography
                sx={{
                  color: "#666",
                }}
                variant="body2"
                component={"p"}
              >
                {item.category}
              </Typography>
            </Typography>

            <Typography
              sx={{
                display: "flex",
                gap: ".5rem",
              }}
              variant="body2"
              component={"p"}
            >
              Tags:
              <Typography
                sx={{
                  color: "#666",
                }}
                variant="body2"
                component={"p"}
              >
                Cloth, printed
              </Typography>
            </Typography>
          </ListItem>
        </List>
      </List>

      <Divider
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      />

      <InfoSec itemDataFromProduct={item} />

      <Box >
        <Typography
          variant="h6"
          component={"p"}
          sx={{
            padding: "0 0 0  4rem   ",

            width: "max-content",
          }}
        >
          Also you may like
        </Typography>
        <Box
          sx={{
            overflow: "auto !important",
            padding: "0 .5rem 0 2.5rem !important",
            display: "flex",
            scrollbarWidth: "none !important" /* Firefox */,
          }}
        >
          <StyledProductHolder
            sx={{
              display: "flex !important",

              justifyContent: " flex-start !important",
              alignItems: "flex-start !important",
              flexWrap: "nowrap !important",
            }}
          >
            {data.map((item, i) => (
              <StyledProduct
                sx={{
                  minWidth: "17rem",
                }}
                key={item.id}
              >
                <ListItem
                  className="wrapper-img"
                  style={{
                  width:"100%",
                    height: "10rem ",
                    overflow:"hidden !important"
                  }}
                >
                  {false ? (
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
                        height: "100%",
                        width: "100%",
                        overflow: "initial",
                      }}
                      loading="lazy"
                      src={item.thumbnail}
                      alt="img"
                    />
                  )}
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
                    {false ? (
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
                        name="read-only"
                        loading="lazy"
                        value={Math.round(item.rating)}
                        readOnly
                      />
                    )}
                  </ListItem>

                  <ListItem disablePadding>
                    {false ? (
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
                        variant="subtitle1"
                        color="text.secondary"
                        loading="lazy"
                      >
                        {item.title}
                      </StyledDisc>
                    )}
                  </ListItem>
                  <ListItem disablePadding>
                    {false ? (
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
                          variant="body1"
                          component={"p"}
                          loading="lazy"
                        >
                          {item.discountPercentage}% off
                        </Typography>
                      </Box>
                    )}
                  </ListItem>
                </Box>

                <ProductOptionsIconsList className="product-options-icons">
                  <ListItem role="button">
                    <ZoomInIcon fontSize="large" />
                  </ListItem>

                  <ListItem
                  role="button"
                    onClick={()=>AddWishList(item.id)}
                  
                  >
                    <FavoriteBorderIcon fontSize="large" />
                  </ListItem>

                  <ListItem>
                    <Link to={`${PATHS.SingleProduct}/${item.id}`}>
                      <ShuffleIcon fontSize="large" />
                    </Link>
                  </ListItem>
                </ProductOptionsIconsList>

                <StyledBtnBottom
                  onClick={() =>
                    AddToCart(
                      item.id,
                      Math.floor(
                        item?.price -
                          (item?.price * item?.discountPercentage) / 100
                      ),
                        1,

                      item.thumbnail,
                      item.title,
                      item.stock,
            

                    )
                  }
                  className="StyledBtnBottom"
                >
                  <OfferBtn>Add to cart</OfferBtn>
                </StyledBtnBottom>
              </StyledProduct>
            ))}
          </StyledProductHolder>
        </Box>
      </Box>

      <AddEmailSec />
    </Box>
      <Footer/>
  </>
  );
};

export default SingleProduct;
