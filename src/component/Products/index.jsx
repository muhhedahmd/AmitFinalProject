import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,

  useMediaQuery,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import {  pink } from "@mui/material/colors";
import axios from "axios";

import LoadMore from "../loadMore";
import UseGetproduct from "../Hooks/UseProduct";
import {  ToastContainer } from "react-toastify";
import ProductDrawrs from "./ProductDrawr";
import ProductsHolder from "./ProductsHolder";

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
const emptyObjects = Array.from({ length: 20 }, () => ({}));

const ProductsSection = () => {

  const [OpenCollapse, setOpenCollapse] = useState(false);
  const [catogriesState, setCatogriesState] = useState(categoriesObject);

  const { memoizedData } = UseGetproduct(
    "https://dummyjson.com/products"
  );

  const [data, setData] = useState(emptyObjects);

  const [dataOfCatogries, setDataOfCatogries] = useState([]);

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

  const [loadMore, setLoadMore] = useState(11);

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        paddingRight: `${isSm ? "0" : "1.5rem"}`,
        display: "flex",
        flexDirection: `${isSm ? "column" : "row"}`,
        // alignItems:"flex-start",
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
              scrollbarWidth: "none !important",

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
                      } else {
                        return null;
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
            {OpenCollapse && !isSm ? (
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

          <ProductsHolder 
          data={memoizedData}
          loadMore={loadMore}

          />
        ) : (

          <ProductsHolder 
          data={dataOfCatogries}
          loadMore={loadMore}

          />

        )}

        <LoadMore
          dataLen={data?.length}
          dataOfCatogriesLen={dataOfCatogries?.length}
          state={loadMore}
          setState={setLoadMore}
        />
      </Box>

      <ProductDrawrs
        HandleCheckboxCatogry={HandleCheckboxCatogry}
        OpenCollapse={OpenCollapse}
        SortCatogry={SortCatogry}
        catogriesState={catogriesState}
        openSortCatogry={openSortCatogry}
        setCatogriesState={setCatogriesState}
        setopenSortCatogry={setopenSortCatogry}
        setOpenCollapse={setOpenCollapse}
        setSortCatogry={setSortCatogry}
      />
      <ToastContainer />
    </Box>
  );
};

export default ProductsSection;
