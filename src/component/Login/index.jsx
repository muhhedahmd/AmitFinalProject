import React, { useState } from "react";

import * as yup from "yup";
import { useAuth } from "../Contexts/Authenticated";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  List,
  ListItem,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import logo from "./logo_dark.png";
import LoginImg from "./Mobile login-pana 1.png";

import { StyledHeader } from "../Header/Style";
import { pink } from "@mui/material/colors";
import axios from "axios";
const Data = {
  UserName: "kminchelle",
  passwoard: "0lelplR",
};

const Login = () => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { login, setUser } = useAuth();

  const [inputs, setinputs] = useState({
    UserName: "",
    passwoard: "",
    checkState: false,
  });

  const schema = yup.object().shape({
    UserName: yup.string().required(""),
    passwoard: yup.string().max(16).min(6).required(""),
  });

  const handleSubmit = (e) => {
    schema
      .validate(
        {
          UserName: inputs.UserName,
          passwoard: inputs.passwoard,
        },
        { abortEarly: false }
      )
      .then(() => {
        axios
          .post(
            "https://dummyjson.com/auth/login",
            {
              username: inputs.UserName,
              password: inputs.passwoard,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data);
              if(inputs.checkState){
                window.localStorage.setItem("token", res.data.token);
              }
              login();
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((validationErrors) => {
        const errors = {};

        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        console.log(errors);
      });

    return e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setinputs((prev) => {
      if (name === "checkState") {
        return { ...prev, [name]: checked };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const rightData = () => {
    setinputs({
      ...Data,
    });
  };

  return (
    <Box>
      <div
        style={{
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: `${isMd ? "column" : "row"}`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: `${isMd ? "100%" : "calc(100vw - 32rem)"}`,
            height: `${isMd ? "65vh" : "100vh" }`,
            background: " #F1F3F6",
            color: "#fff",
          }}
        >
          <StyledHeader
            sx={{
              backgroundColor: "transparent !important",
              position: "sticky !important",
              border: "none !important",
              boxShadow: "none !important",
              padding: ".5rem !important",
              justifyContent: "flex-start !important",
              alignItems: "flex-start !important",
            }}
          >
            <Toolbar>
              <List
                disablePadding
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: `${isMd ? "2rem" : "0"}`,
                }}
              >
                <ListItem disablePadding>
                  <img src={logo} alt="logo.png" />
                </ListItem>
              </List>
            </Toolbar>
          </StyledHeader>

          <Box
            sx={{
              width: "100%",
              height: "85%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={LoginImg}
              style={{ width: `${isMd ? "14rem" : "32vw"}`, height: "auto" }}
              alt="ll"
            />
          </Box>
        </Box>

        <FormGroup
          style={{
            display: "flex",
            justifyContent: `${isMd? "flex-start" : "center"}`,
            alignItems: "center",
            gap: "1.35rem",
            flexDirection: "column",
            height: "100%",
            width: `${isMd ? "100%" : "32rem"}`,
            padding: "2rem",
            boxShadow: `${
              isMd
                ? "rgba(0, 0, 0, 0.11) -2px -3px 19px 0px"
                : "-6px 2px 19px 0px #0000001c"
            }`,
            position: "relative",
            zIndex: 1000000,
          }}
        >
          <FormControl
            sx={{
              width: "20rem",
            }}
          >
            <FormLabel htmlFor="UserName">UserName</FormLabel>
            <Input
              fullWidth
              id="UserName"
              name="UserName"
              type="text"
              onChange={(e) => handleChange(e)}
              value={inputs.UserName}
              placeholder="Enter your UserName...."
            />
          </FormControl>
          <FormControl
            sx={{
              width: "20rem",
            }}
          >
            <FormLabel htmlFor="passwoard">passwoard</FormLabel>
            <Input
              fullWidth
              id="passwoard"
              name="passwoard"
              type="password"
              onChange={(e) => handleChange(e)}
              value={inputs.passwoard}
              placeholder="Enter your passwoard"
            />
          </FormControl>

          <Button
            sx={{
              width: "20rem",

              bgcolor: pink[500],
              color: "#fff",
              ":hover": {
                bgcolor: pink[300],
                color: "#fff",
              },
            }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Submit
          </Button>
          <Button
            fullWidth
            sx={{
              width: "20rem",

              border: ` 2px solid ${pink[500]}`,
              color: pink[500],
            }}
            type="button"
            onClick={rightData}
          >
            {" "}
            Right Data
          </Button>

          <FormControlLabel
            sx={{
              width: "20rem",
            }}
            label={"Rembier me"}
            id="checkState"
            name="checkState"
            control={
              <Checkbox
                id="checkState"
                name="checkState"
                checked={inputs.checkState}
                onChange={(e) => handleChange(e)}
              />
            }
          />
        </FormGroup>

        <Box></Box>
      </div>
    </Box>
  );
};

export default Login;
