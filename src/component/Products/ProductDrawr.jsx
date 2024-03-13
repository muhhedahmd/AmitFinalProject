import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  ListItem,
  useMediaQuery,
    Button
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";

const ProductDrawrs = ({
  setOpenCollapse,
  OpenCollapse,
  setSortCatogry,
  SortCatogry,
  openSortCatogry,
  setCatogriesState,
  setopenSortCatogry,
  catogriesState,
  HandleCheckboxCatogry,
}) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div>
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
              height: "50vh",
              overflowY: "scroll",
              flexWrap: "wrap",
            }}
          >
            <Button
              fullWidth
              component={"p"}
              sx={{
                background: "transparent",
                color: pink[500],
                boxShadow: "none",
                justifyContent: "flex-start",
                alignItems: "center",

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
                  setOpenCollapse(false);
                  return newState;
                });
              }}
            >
              clear -
            </Button>
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
              height: "50vh",
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
        </Drawer>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDrawrs;
