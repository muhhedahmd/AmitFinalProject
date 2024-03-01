import * as React from "react";
import Radio from "@mui/material/Radio";
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Input,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { pink } from "@mui/material/colors";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
export default function Payment({ totalPrice }) {
  const [checked, setChecked] = useState({ cash: false, visa: false });
  const reset = (obj) => {
    const newObj = Object.keys(obj).map((ele) => {
      return (obj[ele] = false);
    });
    return newObj;
  };

  const handleCardChecked = (e) => {
    const { name } = e.target;
    setChecked(reset(checked));
    setChecked((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };
  const [selectedValue, setSelectedValue] = useState({
    cash: true,
    visa: false,
  });
  const handleChange = (event) => {
    const { id } = event.target;
    setSelectedValue(reset(selectedValue));
    setSelectedValue((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const controlProps = (item) => ({
    checked: item,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const StyledBox = styled(Box)(({ theme }) => {
    return {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      borderBottom: `1px solid ${pink[500]}`,
      margin: "1rem  .5rem 0 ",
    };
  });

  return (
    <div>
      <StyledBox id="cash" onClick={(e) => handleChange(e)}>
        <Typography
          variant="body1"
          component={"p"}
          id="cash"
          onClick={(e) => handleChange(e)}
        >
          Cash on deliverly
        </Typography>

        <Radio
          id="cash"
          onClick={(e) => handleChange(e)}
          {...controlProps(selectedValue.cash)}
          size="medium"
        />
      </StyledBox>

      <Collapse in={selectedValue.cash}>
        <Box
          sx={{
            padding: "1rem 0 ",
          }}
        >
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedValue.cash}

                  color="primary"
                  name="cash"
                />
              }
              label="Aplay cash on dilverly + $10 "
            />
          </FormControl>

          <Typography variant="body1" component={"p"}>
            Total is : ${totalPrice + 10}. This will be added to your account
            after the delivery
          </Typography>
        </Box>
      </Collapse>
      <StyledBox id="visa" onClick={(e) => handleChange(e)}>
        <Typography
          id="visa"
          onClick={(e) => handleChange(e)}
          variant="body1"
          component={"p"}
        >
          Cash on deliverly
        </Typography>

        <Radio
          id="visa"
          onClick={(e) => handleChange(e)}
          {...controlProps(selectedValue.visa)}
          size="medium"
        />
      </StyledBox>
      <Collapse in={selectedValue.visa}>

      <Box
          sx={{
            height: "30vh",
          }}
        >


        <form 
        style={{
          height:"100%",
          width:"100%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"flex-start",
          gap:".5rem",
          margin:"1rem  0 2rem 0 "
        }}
        action="#" onSubmit={(e) => e.preventDefault}>
          <FormControl
          fullWidth
          >
            <Input
            sx={{
              // padding:"0 .5rem"
            }}
              variant="standard"
              startAdornment={
                <>
                  <CreditCardIcon />
                </>
              }
              placeholder="Enter Your card number"
            />
          </FormControl>
          <FormControl
          fullWidth
          >
            <Input
            sx={{
              // padding:"0 .5rem"
            }}
              variant="standard"
              startAdornment={
                <>
                  <PersonIcon  />
                </>
              }
              placeholder="Enter Your card holder"
            />
          </FormControl>
          <Box
          sx={{
            width:"100%",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"flex-start"
          }}
          >

          <FormControl
                    sx={{
                    
            width:"10rem",
          }}
          
          >
            <Input
            sx={{
              // padding:" 0 .5rem"
            }}
            type="date"
              variant="standard"
              startAdornment={
                <>
                  <DateRangeIcon/>
                </>
              }
              placeholder="MM/YY"
            />
          </FormControl>
          <FormControl
          sx={{
            width:"10rem",
          }}
          >
            <Input
            sx={{
              // padding:" 0 .5rem"
            }}
              variant="standard"
              startAdornment={
                <>
                  <AppsIcon />
                </>
              }
              placeholder="cvv"
            />
          </FormControl>
          </Box>

        </form>







        </Box>
      </Collapse>
    </div>
  );
}
