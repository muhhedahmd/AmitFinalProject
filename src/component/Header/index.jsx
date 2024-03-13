import {
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  StyledHeader,
  StyledToolBar,
  StyledShoopinCartIcon,
  StyledDropDownMenu,
  StyledHolderDropDownMenu,
} from "./Style";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/Authenticated";
import { useCart } from "../Contexts/CartContext";
import { createRef } from "react";
import { PATHS } from "../PATHS";
import CounterOfThequantitiy from "../CounterOfThequantitiy";
import { grey, pink } from "@mui/material/colors";
import { StyledDisc } from "../Products/Style";
import axios from "axios";
import { ArrowBackIosNew, Close, FavoriteBorder, MenuOutlined } from "@mui/icons-material";

import logo from "./logo_dark.png";
import PoperUser from "./PoperUser";
import { formatCurrency } from "../../utils/Currancy";

const Header = () => {
  const { state, TotalPrice } = useCart();

  const [searchInp, setSearchInp] = useState("");
  const [searcItems, setSearchItems] = useState([]);

  const inpRef = createRef();

  const HandleChange = (e) => {
    const { value } = e.target;
    setSearchInp(value);

    if (value) {
      const regx = new RegExp(searchInp, "gi");

      console.log(regx);
      const news = state.AllItems?.filter((item) => {
        return item.title.match(regx) || item.category.match(regx);
      });

      setSearchItems(news);
    } else {
      setSearchItems([]);
    }
  };

  const [OpenCart, setOpenCart] = useState(false);
  const [search, setSearch] = useState(false);
  const { isAuthenticated } = useAuth();

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const counterRef = useRef();
  const [, setCounterState] = useState(counterRef);
  useEffect(() => {
    setCounterState(counterRef.current);
  }, []);

  const HandleExitSearch = () => {
    setSearch(false);
    setSearchInp("");
    setSearchItems([]);
  };

  const [CatogriesData, setCatogriesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCatogriesData(res.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, []);

  const [smMenuDrawer, setSmMenuDrawer] = useState(false);

  const [CatagoryCollapse, setCatagoryCollapse] = useState(false);

  return (
    <StyledHeader position="static">
      <CssBaseline />
      {isSm ? (
        <StyledToolBar>
          <List
            disablePadding
            sx={{
              color: "#000",
              display: "flex",
            }}
          >
            <ListItem
              disablePadding
              sx={{
                margin: "0 1rem 0 0",
              }}
              onClick={() => setSmMenuDrawer((prev) => true)}
            >
              <MenuOutlined />
            </ListItem>

            <ListItem
              disablePadding
              onClick={() => {
                setSearch((prev) => !prev);
              }}
            >
              <SearchIcon color="#000"  sx={{cursor:"pointer"}}/>
            </ListItem>
          </List>

          <ListItem
            sx={{
              padding: "12px 1rem 0  ",
              width: "fit-content",
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo_dark" />
            </Link>
          </ListItem>

          <ListItem
            sx={{
              width: "fit-content",
            }}
          >
            <List disablePadding className="operation-list">
              <StyledShoopinCartIcon
                cartItems={
                  state.cartItems.length ? state.cartItems.length : null
                }
                role="button"
                onClick={() => {
                  return setOpenCart(true);
                }}
                disablePadding
              >
                <ShoppingCartIcon />
              </StyledShoopinCartIcon>

              {isAuthenticated ? (
                <PoperUser/>
              ) : (
                ""
              )}
            </List>
          </ListItem>
        </StyledToolBar>
      ) : (
        <StyledToolBar>
          <List
            sx={{
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"2rem",
            }}
          >
            <StyledHolderDropDownMenu
              disablePadding
              sx={{
                position: "relative",
                width: "fit-content",
              }}
            >
              <Typography
                sx={{
                  color: grey[800],
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                }}
                component={"p"}
                variant="body2"
              >
                Catagory
              </Typography>

              <StyledDropDownMenu className="DropDown">
                {CatogriesData.map((item) => {
                  return (
                    <ListItem
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <Typography
                        variant="body2"
                        component={"p"}
                        sx={{
                          textTransform: "capitalize",

                          color: grey[700],
                        }}
                      >
                        <Link to={PATHS.SingleCatagory + "/" + item}>
                          {item.split("-").join(" ")}
                        </Link>
                      </Typography>
                    </ListItem>
                  );
                })}
              </StyledDropDownMenu>
            </StyledHolderDropDownMenu>
            <ListItem
            sx={{
              padding:".5rem 0 0 0"
            }}

            >

                    <Link
                    style={{
                      padding:'0',
                    }}
                     to={"/wishlist"}>
                      <FavoriteBorder />

                    </Link>
            </ListItem>
         
          </List>

          <ListItem
            sx={{
              width: "fit-content",
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo_dark" />
            </Link>
          </ListItem>

          <ListItem
            sx={{
              width: "fit-content",
            }}
          >
            <List disablePadding className="operation-list">
              <ListItem
                disablePadding
                onClick={() => {
                  setSearch((prev) => !prev);
                }}
              >
                <SearchIcon color="#000" />
              </ListItem>

              <StyledShoopinCartIcon
                cartItems={
                  state.cartItems.length ? state.cartItems.length : null
                }
                role="button"
                onClick={() => {
                  return setOpenCart(true);
                }}
                disablePadding
              >
                <ShoppingCartIcon />
              </StyledShoopinCartIcon>

              {isAuthenticated ? (
                <PoperUser/>
              ) : (
                ""
              )}
            </List>
          </ListItem>
        </StyledToolBar>
      )}

      <Drawer
        transitionDuration={{
          enter: 500,
          exit: 400,
        }}
        anchor={"right"}
        open={OpenCart}
        onClose={() => setOpenCart(false)}
      >
        <List
          sx={{
            position: "relative",
            width: `${!isSm ? "40vw" : "80vw"}`,
            transition: ".5s",
          }}
        >
          <ListItem>
            <Typography
              sx={{
                padding: "1rem 0  00 0 ",
              }}
              variant="h5"
              component={"h5"}
            >
              Your shooping cart
            </Typography>
          </ListItem>

          {state.cartItems.length > 0
            ? state.cartItems.map((item) => {
                return (
                  <>
                    <List
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "1rem",
                        padding: "1rem 3rem",
                        border: "1px solid #ddd",
                      }}
                    >
                      <ListItem
                        sx={{
                          height: "10rem",
                          color: grey[400],
                          justifyContent: "center",
                          padding: 0,
                          width: "fit-content",
                        }}
                      >
                        <Link to={`${PATHS.SingleProduct}/${item.id}`}>
                          <img
                            style={{
                              transition: ".5s",
                              maxWidth: "5rem",
                            }}
                            src={item.img}
                            alt=""
                          />
                        </Link>
                      </ListItem>
                      <ListItem disablePadding>
                        <List
                          sx={{
                            fontSize: ".9rem",
                          }}
                        >
                          <ListItem
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              flexDirection: "column",
                            }}
                          >
                            <Link to={`${PATHS.SingleProduct}/${item.id}`}>
                              <Typography
                                variant="body1"
                                sx={{ width: "100%", fontSize: "inherit" }}
                                component={"p"}
                              >
                                {item.title}
                              </Typography>
                            </Link>
                            <Typography
                              sx={{ width: "100%", fontSize: "inherit" }}
                              variant="body2"
                              component={"p"}
                            >
                              price: {Math.floor(item?.price * item.quantity)}
                            </Typography>
                          </ListItem>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "2rem",
                              flexDirection: `${isSm ? "column" : "row"}`,
                            }}
                            display={"flex"}
                          >
                            <ListItem
                              sx={{
                                display: "flex",
                                width: "7rem",
                                justifyContent: "center",
                                alignItems: "flex-start",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "inherit",
                                }}
                                component={"p"}
                              >
                                Qty: {item.quantity}
                              </Typography>
                            </ListItem>
                            <ListItem
                              sx={{
                                gap: "1rem",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                              className="counter-section"
                            >
                              <CounterOfThequantitiy
                                drawercart={true}
                                item={item}
                                ref={counterRef}
                              />
                            </ListItem>
                          </div>
                        </List>
                      </ListItem>
                    </List>
                  </>
                );
              })
            : ""}
        </List>

        <Box
          sx={{
            borderTop: "1px solid #7777",
            position: "fixed",
            width: `${isSm ? "80%" : "40%"}`,
            background: "#ffffff",
            zIndex: "1000",
            top: "84%",
            height: "7rem",
            padding: "2rem 0",
            translate: "transform(-50% ,-50%)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              margin: " 0 0 1rem  0 ",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "88%",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                letterSpacing: "2px",
                // color: #f07;
              }}
              variant="body2"
              component={"p"}
            >
              SubTotal:
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                letterSpacing: "2px",
                color: pink[600],
              }}
              variant="body2"
              component={"p"}
            >
              {state.cartItems.length ? "$" + formatCurrency(TotalPrice) : "No item Add Yet"}
            </Typography>
          </Box>

          <Button
            disableRipple
            sx={{
              transition: ".3s",
              border: "1px solid #333",
              color: "#333",
              borderRadius: "4px",
              width: "90%",

              ":hover": {
                color: "#fff",
                backgroundColor: "#333",
              },
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={PATHS.cart}
            >
              continue to checkout
            </Link>
          </Button>
        </Box>
      </Drawer>

      <Drawer
        ModalProps={Box}
        PaperProps={{
          sx: {
            background: "transparent",
          },
        }}
        transitionDuration={{
          enter: 500,
          exit: 400,
        }}
        anchor={"left"}
        open={search}
        onClose={() => HandleExitSearch()}
      >
        <Box
          sx={{
            zIndex: "10",
            position: "relative",
            background: "transparent",
            width: "100vw",
            height: "100vh",
            backdropFilter: "brightness(0.3)",
          }}
        >
          <Button
            disableTouchRipple
            onClick={() => HandleExitSearch()}
            sx={{
              color: grey[300],
              position: "absolute",
              top: "3%",
              left: `${isSm ? "79%" : "94%"}`,
              fontSize: "1.5rem",
              ":hover": {
                color: pink[500],
              },
            }}
          >
            <Close />
          </Button>
          <Box
            sx={{
              zIndex: "11",
              display: "flex",
              position: "absolute",
              top: `${searchInp ? "8%" : "50%"}`,
              left: "50%",
              transform: "translate(-50% , -50%)",
              transition: ".4s",
            }}
          >
            <input
              ref={inpRef}
              value={searchInp}
              onChange={(e) => HandleChange(e)}
              style={{
                position: "relative",
                background: "transparent",
                width: `${isSm ? "15rem" : "30rem"}`,
                padding: "1.3rem 5rem  1.3rem .5rem",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #fff",
                color: "#Fff",
                fontSize: "1rem",
                letterSpacing: "1px",
              }}
              type="text"
              placeholder="Search..."
            />
          </Box>

          <Box
            sx={{
              // overflow:"scroll",
              display: "flex",
              position: "absolute",
              transitionDelay: ".4s",
              opacity: "1",
              transform: "translateY( 18%)",
              transition: ".4s opacity",
              width: "100%",

              overflowY: "auto",
              overflowX: "hidden",
              height: "81vh",
            }}
            className="items-searched"
          >
            <List
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill , minmax(255px , 1fr))",
                width: "100%",
                transition: ".4s",
                transitionDelay: ".4s",
              }}
            >
              {searcItems.map((item) => {
                return (
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    key={item.id}
                  >
                    <List
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        height: "17rem",
                        color: grey[300],

                        borderRadius: "4px",
                      }}
                    >
                      <ListItem
                        disablePadding
                        sx={{
                          padding: " 0 0 .5rem 0 ",
                        }}
                      >
                        <Link
                          style={{
                            color: grey[300],
                            textDecoration: "none",
                          }}
                          to={`${PATHS.SingleProduct}/${item.id}`}
                        >
                          <StyledDisc
                            lineBreak={"1"}
                            variant="body1"
                            component={"p"}
                          >
                            {item.title}
                          </StyledDisc>
                        </Link>
                      </ListItem>

                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#fff",
                          height: "10rem",
                          alignSelf: "center",
                          width: "15rem",
                        }}
                      >
                        <img
                          style={{
                            maxWidth: "100%",
                            maxHeight: "8rem",
                          }}
                          src={item.thumbnail}
                          alt={`thumbnail${item.id}`}
                        />
                      </ListItem>
                      <ListItem
                        disablePadding
                        sx={{
                          padding: ".5rem 0 0  0",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: pink[500],
                          }}
                          variant="body1"
                          component={"p"}
                        >
                          $
                          {Math.floor(
                            item?.price -
                              (item?.price * item?.discountPercentage) / 100
                          )}
                        </Typography>

                        <Typography variant="body1" component={"p"}>
                          {item?.discountPercentage}%
                        </Typography>

                        <Typography
                          sx={{
                            textDecoration: "line-through",
                          }}
                          variant="body1"
                          component={"p"}
                        >
                          ${item?.price}
                        </Typography>
                      </ListItem>
                    </List>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        transitionDuration={{
          enter: 500,
          exit: 400,
        }}
        anchor={"left"}
        open={smMenuDrawer}
        onClose={() => setSmMenuDrawer(false)}
      >
        <List
          sx={{
            width: `${!isSm ? "40vw" : "80vw"}`,
            transition: ".5s",
          }}
        >
          <ListItem>
            <Typography
              sx={{
                width: "100%",
                color: pink[500],
                padding: "1rem 0  0 0 ",
              }}
              variant="h5"
              component={"p"}
            >
              Shop Wise
            </Typography>
          </ListItem>
          <ListItem>
            <Divider
              component={"div"}
              sx={{
                width: "100%",
              }}
            />
          </ListItem>
        </List>
        <List
        disablePadding
        >


        <ListItem
          sx={{
            width: "100%",
          }}
        >
          <Button
            onClick={() => setCatagoryCollapse((prev) => !prev)}
            sx={{
              color: grey[900],
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "inherit",
            }}
          >
            <Typography
              component={"h5"}
              variant="p"
              fontSize={"medium"}
              fontWeight={"normal"}
            >
              Catagory
            </Typography>

            <ArrowBackIosNew fontSize="small" />
          </Button>
       

        </ListItem>
        <ListItem
          // disablePadding
          sx={{ pt: "0" }}
        >
          <Collapse in={CatagoryCollapse} id={"Catogries"}>
            <List disablePadding>
              {CatogriesData.map((item) => {
                return (
                  <ListItem>
                    <Link
                      to={PATHS.SingleCatagory + "/" + item}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {item}
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </ListItem>

        <ListItem>
        <Link
                    style={{
                      paddingLeft:".5rem",
                      padding:'0',
                      color:"#333",
                      textDecoration:"none",
                      fontSize:"1.3rem",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      gap:"1rem"
                    }}
                     to={"/wishlist"}>
                     
                     Wish List <FavoriteBorder />

                    </Link>
        </ListItem>
        </List>



      </Drawer>
    </StyledHeader>
  );
};

export default Header;

// const menuConfigration = {
//   HOME: "simple",
//   PRODUCTS: "nested",
//   PAGES: "simple",
//   SHOP: "nested",
//   BLOG: "nested",
// };

/* <ListItem>
            <StyledHolderList sx={{ position: "relative" }}>
              {Object.keys(headerOeration).map((item, index) => {
                return (
                  <>
                    <ListItem
                      className="Dro"
                      id={item}
                      sx={{ width: "max-content" }}
                      // onMouseEnter={(e)=>handleHover(e)}
                    >
                      <Typography
                        className="text-pink"
                        id={item}
                        sx={{ fontSize: ".91rem", fontWeight: "600" }}
                        variant="a"
                        component={"a"}
                      >
                        {item}
                      </Typography>

                      {menuConfigration[item] === "simple" ? (
                        <SimpleCatagory
                          key={index}
                          item={headerOeration[item]}
                        />
                      ) : menuConfigration[item] === "nested" ? (
                        <NestedCatagorie
                          key={index}
                          item={headerOeration[item]}
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </>
                );
              })}
            </StyledHolderList>
          </ListItem> */

