import React, { useEffect, useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Rating,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { Link } from "react-router-dom";
import OfferBtn from "../OfferBtn";
import { PATHS } from "../PATHS";
import { useCart } from "../Contexts/CartContext";
import {
  ProductOptionsIconsList,
  StyledBtnBottom,
  StyledDisc,
  StyledProduct,
  StyledProductHolder,
} from "./Style";
import { grey, pink } from "@mui/material/colors";
import axios from "axios";

import LoadMore from "../loadMore";
import UseGetproduct from "../Hooks/UseProduct";

const Catogries = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const categoriesObject = {};

Catogries.forEach((category) => {
  categoriesObject[category] = false;
});

const ProductsSection = () => {
  const [OpenCollapse, setOpenCollapse] = useState(false);
  const [catogriesState, setCatogriesState] = useState(categoriesObject);
  const { AddToCart } = useCart();

  const { memoizedData, isLoading } = UseGetproduct(
    "https://dummyjson.com/products"
  );

  const EmptyArray = new Array(20);
  const [data, setData] = useState(EmptyArray);

  const [dataOfCatogries, setDataOfCatogries] = useState([]);

  useEffect(() => {
    setData(memoizedData);
  }, [memoizedData]);

  const HandleCheckboxCatogry = (e, item, state, setState, onlyOne) => {
    const { checked } = e.target;

    if (onlyOne) {
      const updatedState = {};
      for (const key in state) {
        updatedState[key] = key === item ? checked : false;
      }
      setState(updatedState);
    } else {
      const updatedState = {
        ...state,
        [item]: checked,
      };
      setState(updatedState);
    }
  };

  const [SortCatogry, setSortCatogry] = useState({
    open: false,
    Name: false,
    descending: false,
    ascending: false,
    rating: false,
    Recomented: true,
  });
  const [openSortCatogry, setopenSortCatogry] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const SelectedCategories = [];
      const newDataArray = []; // Initialize as an array

      Object.keys(catogriesState).forEach((category) => {
        if (catogriesState[category]) {
          SelectedCategories.push(category);
        }
      });

      if (SelectedCategories.length > 0) {
        for (const cat of SelectedCategories) {
          try {
            const response = await axios.get(
              `https://dummyjson.com/products/category/${cat}`
            );
            const categoryData = response.data.products;
            newDataArray.push(...categoryData); // Push each categoryData array into newDataArray
          } catch (err) {
            // console.error("Error fetching category data:", err);
          }
        }

        setDataOfCatogries(newDataArray);
      } else {
        setDataOfCatogries([]);
      }
      setLoadMore(() => 5);
    };

    fetchData();
  }, [catogriesState]);

  useEffect(() => {
    let SelectedCategories = "";
    // const newDataArray = []; // Initialize as an array

    Object.keys(SortCatogry).forEach((category, i) => {
      if (SortCatogry[category] && i > 0) {
        SelectedCategories += `${category}`;
      }
    });

    if (SelectedCategories === "Name") {
      setData(memoizedData.slice().sort((a, b) => a.title - b.title));

      if (dataOfCatogries.length > 0)
        setDataOfCatogries((prev) =>
          prev.slice().sort((a, b) => a.title - b.title)
        );
    }
    if (SelectedCategories === "descending") {
      setData(
        memoizedData
          .slice()
          .sort(
            (a, b) =>
              b?.price -
              (b?.price * b?.discountPercentage) / 100 -
              (a?.price - (a?.price * a?.discountPercentage) / 100)
          )
      );
      if (dataOfCatogries.length > 0)
        setDataOfCatogries((prev) =>
          prev
            .slice()
            .sort(
              (a, b) =>
                (b?.price * b?.discountPercentage) / 100 -
                (a?.price - (a?.price * a?.discountPercentage) / 100)
            )
        );
    }
    if (SelectedCategories === "ascending") {
      setData(
        memoizedData
          .slice()
          .sort(
            (a, b) =>
              a?.price -
              (a?.price * a?.discountPercentage) / 100 -
              (b?.price - (b?.price * b?.discountPercentage) / 100)
          )
      );
      if (dataOfCatogries.length > 0)
        setDataOfCatogries((prev) =>
          prev
            .slice()
            .sort(
              (a, b) =>
                a?.price -
                (a?.price * a?.discountPercentage) / 100 -
                (b?.price - (b?.price * b?.discountPercentage) / 100)
            )
        );
    }

    if (SelectedCategories === "rating") {
      setData(memoizedData.slice().sort((a, b) => b.rating - a.rating));
      if (dataOfCatogries.length > 0)
        setDataOfCatogries((prev) =>
          prev.slice().sort((a, b) => b.rating - a.rating)
        );
    }
    if (SelectedCategories === "Recomented") {
      setData(
        memoizedData
          .slice()
          .sort(
            (a, b) =>
              b.rating - a.rating &&
              a?.price -
                (a?.price * a?.discountPercentage) / 100 -
                (b?.price - (b?.price * b?.discountPercentage) / 100)
          )
      );
      if (dataOfCatogries.length > 0)
        setDataOfCatogries((prev) =>
          prev
            .slice()
            .sort(
              (a, b) =>
                b.rating - a.rating &&
                a?.price -
                  (a?.price * a?.discountPercentage) / 100 -
                  (b?.price - (b?.price * b?.discountPercentage) / 100)
            )
        );
    }
  }, [SortCatogry, dataOfCatogries.length, memoizedData]);

  const [loadMore, setLoadMore] = useState(10);

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        paddingRight: "1.5rem",
        display: "flex",
        flexDirection: `${isSm ? "column" : "row"}`,
      }}
    >
      <Box
        sx={{
          margin: "1.9rem 0 0 1vw",
          height: "100%",
          padding: "1vw",
          border: "1px solid #DDd",
          borderRadius: "4px",
        }}
      >
        <List>
          <ListItem disablePadding>
            <Button
              component={"p"}
              sx={{
                background: "transparent",
                color: pink[500],
                boxShadow: "none",

                ":focus": {
                  background: "transparent",
                  boxShadow: "none",
                },
                ":hover": {
                  background: "transparent",
                  boxShadow: "none",
                },
              }}
              color="info"
              aria-describedby={"SortCatogries"}
              variant="contained"
              onClick={() => setopenSortCatogry((prev) => !prev)}
            >
              <SortIcon />
            </Button>
          </ListItem>

          <ListItem
            sx={{
              scrollbarWidth: "none !important" /* Firefox */,

              overflowX: "auto",
            }}
          >
            <List
              disablePadding
              sx={{
                display: `flex `,
                flexDirection: `${isSm ? "row" : "column"}`,
              }}
            >
              {isSm ? (
                ""
              ) : (
                <Collapse
                  id={"SortCatogries"}
                  anchor="bottom"
                  open={openSortCatogry}
                  in={openSortCatogry}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: `${isSm ? "row" : "column"}`,
                    }}
                  >
                    {Object.keys(SortCatogry).map((item, i) =>  
                    
                    {
          
                      if (i > 0) {
                        return (
                          <ListItem
                            key={i}
                            disablePadding
                            sx={{
                              p: " 0 0 0 .5rem",
                              fontSize: ".8rem",
                            }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={SortCatogry[item]}
                                    id={item}
                                    component={"p"}
                                    onChange={(e) =>
                                      HandleCheckboxCatogry(
                                        e,
                                        item,
                                        SortCatogry,
                                        setSortCatogry,
                                        true
                                      )
                                    }
                                    sx={{
                                      fontSize: ".9rem",
                                      color: pink[500],
                                      "&.Mui-checked": {
                                        color: pink[600],
                                      },
                                    }}
                                  />
                                }
                                label={item}
                              />
                            </FormGroup>
                          </ListItem>
                        );
                      }
                      else {
                        return null
                      }
                    })}
                  </Box>
                </Collapse>
              )}
            </List>
          </ListItem>

          <ListItem disablePadding>
            <Button
              component={"p"}
              sx={{
                background: "transparent",
                color: pink[500],
                boxShadow: "none",

                ":focus": {
                  background: "transparent",
                  boxShadow: "none",
                },
                ":hover": {
                  background: "transparent",
                  boxShadow: "none",
                },
              }}
              color="info"
              aria-describedby={"Catogries"}
              variant="contained"
              onClick={() => setOpenCollapse((prev) => !prev)}
            >
              Catogries +
            </Button>
            {OpenCollapse ? (
              <Button
                component={"p"}
                sx={{
                  background: "transparent",
                  color: pink[500],
                  boxShadow: "none",

                  ":focus": {
                    background: "transparent",
                    boxShadow: "none",
                  },
                  ":hover": {
                    background: "transparent",
                    boxShadow: "none",
                  },
                }}
                color="info"
                aria-describedby={"Catogries"}
                variant="contained"
                onClick={() => {
                  setCatogriesState((prevState) => {
                    const newState = {};
                    Object.keys(prevState).forEach((key) => {
                      newState[key] = false;
                    });
                    return newState;
                  });
                }}
              >
                clear
              </Button>
            ) : (
              ""
            )}
          </ListItem>

          <ListItem
            sx={{
              overflowX: "auto",
              display: "flex",
              scrollbarWidth: "none !important" /* Firefox */,
            }}
          >
            <List disablePadding>
              {!isSm ? (
                <Collapse id={"Catogries"} in={OpenCollapse}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: `${isSm ? "row" : "column"}`,
                    }}
                  >
                    {Object.keys(catogriesState).map((item, i) => {
                      return (
                        <ListItem
                          key={i}
                          disablePadding
                          sx={{
                            p: " 0 0 0 .5rem",
                            fontSize: ".8rem",
                          }}
                        >
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={catogriesState[item]}
                                  id={item}
                                  component={"p"}
                                  onChange={(e) =>
                                    HandleCheckboxCatogry(
                                      e,
                                      item,
                                      catogriesState,
                                      setCatogriesState
                                    )
                                  }
                                  sx={{
                                    width: "max-content",
                                    fontSize: ".9rem",
                                    color: pink[500],
                                    "&.Mui-checked": {
                                      color: pink[600],
                                    },
                                  }}
                                />
                              }
                              label={item}
                            />
                          </FormGroup>
                        </ListItem>
                      );
                    })}
                  </Box>
                </Collapse>
              ) : (
                ""
              )}
            </List>
          </ListItem>
        </List>
      </Box>

      <Box
        sx={{
          flex: "1",
        }}
      >
        {!dataOfCatogries.length ? (
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
                            height: "8rem",
                            width: "8rem",
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
                            name="read-only"
                            loading="lazy"
                            value={Math.round(item.rating)}
                            readOnly
                          />
                        )}
                      </ListItem>

                      <ListItem disablePadding>
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
                            variant="subtitle1"
                            color="text.secondary"
                            loading="lazy"
                          >
                            {item.title}
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

                      <ListItem>
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
                          item.stock
                        )
                      }
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
        ) : (
          <StyledProductHolder>
            {dataOfCatogries?.map((item, i) =>
              i <= loadMore ? (
                <StyledProduct key={item.id}>
                  <ListItem
                    className="wrapper-img"
                    width="100%"
                    sx={{
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
                          height: "8rem",
                          width: "8rem",
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
                          name="read-only"
                          loading="lazy"
                          value={Math.round(item.rating)}
                          readOnly
                        />
                      )}
                    </ListItem>

                    <ListItem disablePadding>
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
                          variant="subtitle1"
                          color="text.secondary"
                          loading="lazy"
                        >
                          {item.title}
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

                    <ListItem>
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
                        item?.price -
                          (item?.price * item?.discountPercentage) / 100,
                        1,
                        item.image,
                        item.title,
                        item.stock
                      )
                    }
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
        )}

        <LoadMore
          dataLen={data?.length}
          dataOfCatogriesLen={dataOfCatogries?.length}
          state={loadMore}
          setState={setLoadMore}
        />
      </Box>

      {isSm ? (
        <Drawer
          id={"Catogries"}
          open={OpenCollapse}
          onClose={() => setOpenCollapse(false)}
          anchor="bottom"
        >
          <Box
            sx={{
              padding: ".5rem",
              display: "flex",
              flexDirection: "row",
              maxHeight: "40vh",
              overflowY: "scroll",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(catogriesState).map((item, i) => {
              return (
                <ListItem
                  key={i}
                  disablePadding
                  sx={{
                    width: "50%",
                    p: " 0 0 0 .5rem",
                    fontSize: ".8rem",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={catogriesState[item]}
                          id={item}
                          component={"p"}
                          onChange={(e) =>
                            HandleCheckboxCatogry(
                              e,
                              item,
                              catogriesState,
                              setCatogriesState
                            )
                          }
                          sx={{
                            width: "max-content",
                            fontSize: ".9rem",
                            color: pink[500],
                            "&.Mui-checked": {
                              color: pink[600],
                            },
                          }}
                        />
                      }
                      label={item}
                    />
                  </FormGroup>
                </ListItem>
              );
            })}
          </Box>
        </Drawer>
      ) : (
        ""
      )}

      {isSm ? (
        <Drawer
          id={"SortCatogries"}
          onClose={() => setopenSortCatogry((prev) => false)}
          anchor="bottom"
          open={openSortCatogry}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Object.keys(SortCatogry).map((item, i) => {
              if (i > 0) {
                return (
                  <ListItem
                    key={i}
                    disablePadding
                    sx={{
                      p: " 0 0 0 .5rem",
                      fontSize: ".8rem",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={SortCatogry[item]}
                            id={item}
                            component={"p"}
                            onChange={(e) =>
                              HandleCheckboxCatogry(
                                e,
                                item,
                                SortCatogry,
                                setSortCatogry,
                                true
                              )
                            }
                            sx={{
                              fontSize: ".9rem",
                              color: pink[500],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                          />
                        }
                        label={item}
                      />
                    </FormGroup>
                  </ListItem>
                );
              }
              else {
                return null
              }
            })}
          </Box>
        </Drawer>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ProductsSection;
