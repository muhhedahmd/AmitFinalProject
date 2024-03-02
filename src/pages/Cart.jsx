import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  
  Step,
  StepLabel,
  Stepper,
  
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
// import { useLocation } from 'react-router-dom'
import { useCart } from "../component/Contexts/CartContext";
import CartItem from "../component/CartItem";
// import { grey } from '@mui/material/colors'
// import { BackHandOutlined, BackpackOutlined } from '@mui/icons-material'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { StyledDiscountInp, StyledListItemForPriceSummary } from "./style";
import AdaressSection from "../component/AdaressSection";
import { useTheme } from "@emotion/react";
import Payment from "../component/Payment";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: pink[500],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: pink[500],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: pink[500],
  }),
  "& .QontoStepIcon-completedIcon": {
    color: pink[500],
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const Cart = () => {
  const [DiscountInp, setDiscountInp] = useState("");
  const HandleDicountInp = (e) => {
    if (!state.discountCode) {
      const { value } = e.target;
      setDiscountInp(value);
    } else {
      setDiscountInp(state.discountCode);
    }
  };
  const theme = useTheme();
  const { ApplyDiscount, state, TotalPrice } = useCart();

  const steps = ["Total price", "dilverly", "payment"]
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  const [stepsState, setStepsState] = useState(0);

  const HandleApplyBtn = () => {
    return DiscountInp ? ApplyDiscount(DiscountInp) : "";
  };
  return (
    <Box
      sx={{

        display: "flex",
        padding: " 2rem",
        maxWidth: "100%",
        flexDirection: `${isSm ? 'column' : "row"}`,
        '::-webkit-scrollbar':{
  width: "5px",
},
'::-webkit-scrollbar-track':{
  backgroundColor: "grey",
},

"::-webkit-scrollbar-thumb":{
  backgroundColor: "rgb(255, 0, 81)",
borderRadius: ".5rem",
}

      }}
    >
      <Box
        sx={{
          width: `${isSm ? '100%' : "65%"}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexDirection: 'row-reverse',
          }}
        >
          <Typography
            sx={{
              marginBottom: "1rem",
            }}
            variant="h5"
            component={"h5"}
          >
            Shopping Cart
          </Typography>
          <Button
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              color: pink[500],
              background: "#fff",
              boxShadow: "none",
              ":hover , :focus": {
                background: "#fff",
                boxShadow: "none",
              },
            }}
            variant="contained"
          >
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Button>
        </Box>

        <Box
          sx={{
            maxHeight: "30rem",
            overflowY: "auto",
            padding: "1rem",
            // width:"fit-content"
          }}
        >
          {state?.cartItems?.map((item) => {
            return (
              <Box>
                <CartItem {...item} item={item} />
                {isSm ? "" : 
                  <Divider
                  sx={{
                    width: "100%",
                  }}
                />

                }
                              </Box>
            );
          })}
        </Box>

        <Box>
          <Box
            sx={{
              width: "100%",
              margin: "0rem 0 0 0",
              padding: "0 .5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
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
              {state.cartItems.length ? "$" + TotalPrice : "No item Add Yet"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: `${isSm ? '100%' : "35%"}`,
    
          borderLeft: `${isSm ? "0":"1px solid #2222"}`,
          height: " 90vh",
          margin: `${isSm ? '0'  :"0 0 0 1rem" }`,
          padding: `${isSm ? '0'  :"0 0 0 1rem" }`,
        }}
      >
        <List>
          <ListItem
          disableGutters
          disablePadding
          >
            <Typography variant="h6" component={"p"}>
              {steps[stepsState] === undefined
                ? "Purschase Done"
                : steps[stepsState]}
            </Typography>
          </ListItem>
        </List>

        <Stepper
          alternativeLabel
          activeStep={stepsState}
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {stepsState === 0 ? (
          <List>
            <StyledListItemForPriceSummary>
              <Typography variant="p" component={"p"}>
                Total Bag
              </Typography>
              <Typography variant="p" component={"p"}>
                ${TotalPrice}
              </Typography>
            </StyledListItemForPriceSummary>

            <StyledListItemForPriceSummary>
              <Typography variant="p" component={"p"}>
                Total Vat/Cst
              </Typography>
              <Typography variant="p" component={"p"}>
                $10
              </Typography>
            </StyledListItemForPriceSummary>

            <StyledListItemForPriceSummary>
              <Typography variant="p" component={"p"}>
                Discount
              </Typography>
              <Typography variant="p" component={"p"}>
                {state.discountCode ? "$10" : "0$"}
              </Typography>
            </StyledListItemForPriceSummary>

            <StyledListItemForPriceSummary>
              <StyledDiscountInp
                onChange={(e) => HandleDicountInp(e)}
                type="text"
                placeholder="Enter discount code here..."
              />

              <Button
                variant="outlined"
                onClick={(e) => HandleApplyBtn()}
                style={{
                  borderRadius: "0",
                  padding: ".3rem .2rem",
                  border: " 1px solid rgb(255 9 90)",
                  width: " 6rem",
                  background: "#ff095a",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Apply
              </Button>
            </StyledListItemForPriceSummary>

            <StyledListItemForPriceSummary>
              <Typography
                sx={{
                  color: pink[500],
                }}
                variant="h6"
                component={"p"}
              >
                Total Payment
              </Typography>
              <Typography
                sx={{
                  color: pink[500],
                }}
                variant="h6"
                component={"p"}
              >
                ${TotalPrice + (state.discountCode ? 10 : 0) + 10}
              </Typography>
            </StyledListItemForPriceSummary>

            <StyledListItemForPriceSummary>
              {!(state.cartItems.length > 0) ? (
                <Button
                  sx={{
                    color: "#fff",
                    background: pink[500],
                    width: "100%",
                    border: `1px solid ${pink[500]}`,
                    ":hover  ": {
                      color: pink[500],
                      background: "#fff",
                    },
                  }}
                >
                  <Link
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    to={"/"}
                  >
                    Back to Shop
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    state.cartItems.length > 0
                      ? setStepsState((prev) => (prev < 3 ? prev + 1 : prev))
                      : ""
                  }
                  sx={{
                    color: "#fff",
                    background: pink[500],
                    width: "100%",
                    border: `1px solid ${pink[500]}`,
                    ":hover  ": {
                      color: pink[500],
                      background: "#fff",
                    },
                  }}
                >
                  Continou
                </Button>
              )}
            </StyledListItemForPriceSummary>
          </List>
        ) : stepsState === 1 ? (

          <>
          <AdaressSection  setStepsState={ setStepsState}  />

          <Button
          fullWidth
          sx={{
            padding:".3rem .5rem"
          }}
          onClick={()=>setStepsState((prev)=>prev -1)}
          >
            Go Back
          </Button>
          </>
        ) :  stepsState === 2 ? (
<>

          

  <Payment 
    totalPrice={TotalPrice + (state.discountCode ? -10 : 0) + 10}
  />

          <Button
          fullWidth
          sx={{
            padding:".3rem .5rem"
          }}
          onClick={()=>setStepsState((prev)=> prev -1)}
          >
            Go Back
          </Button>
</>
        ):""}
      </Box>
    </Box>
  );
};

export default Cart;
