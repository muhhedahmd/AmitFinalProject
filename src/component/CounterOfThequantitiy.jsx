import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyledCounterBtn, StyledCounterText } from "./SingleProduct/style";
import { Button, ListItem, Typography } from "@mui/material";
import { useCart } from "./Contexts/CartContext";
import { pink } from "@mui/material/colors";

const CounterOfThequantitiy = forwardRef(function CounterOfThequantitiy(
  { item, drawercart, ...rest },
  ref,
) {
  
  const counterRef = useRef();
  const { EditOnQtyItemCart , ReflectChangesItemCart } = useCart();
  const [counterVal, setCounterVal] = useState(1);
  console.log(counterVal)
  useEffect(()=>{
    if(item.quantity){
      setCounterVal(item.quantity)
    }
  }, [item.quantity])


  const handleIncrement = () => {
    console.log( "item.quantity", item.quantity)



    if(typeof counterVal === typeof 1 )
    {   
      const newCounterVal = +counterVal + 1;
      setCounterVal(+newCounterVal);
      if (drawercart || rest.cart) {
      EditOnQtyItemCart(item.id, +newCounterVal);
    }
  }
  };

  const handleDecrement = () => {
    if(counterVal > 0 )
    {
      const newCounterVal =   Math.max(1, +counterVal - 1);
      setCounterVal(newCounterVal);
      if (drawercart || rest.cart) {
        EditOnQtyItemCart(item.id, +newCounterVal);

    }
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    let newCounterVal = value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      if(newCounterVal <= item.stock)
      {
        
        if (drawercart) {
        newCounterVal = value === "" ? 0 : parseInt(value);
        setCounterVal(newCounterVal);
          EditOnQtyItemCart(item.id, newCounterVal);
          ReflectChangesItemCart(item.id)
        }
        if (!drawercart) {
        newCounterVal = value === "" ? 0 : parseInt(value);
        setCounterVal(newCounterVal);
        }
      }      
    }
    

  };

  useEffect(() => {
    counterRef.current = counterVal;
    console.log(counterVal)
  }, [counterVal]);

  useImperativeHandle(ref, () => ({

    getCounterState: () => counterRef.current,
  }));


  return (
    <>
    {rest.cart ? 
      (
        <ListItem
      disablePadding
      sx={{

          margin:"0 1rem",
          borderRadius:"20px",
          padding:"0",
          width:"8rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          border:`1px solid ${pink[400]}`,
      }}
      
      >
      <Button
      disableRipple
      disableTouchRipple
      disableFocusRipple
sx={{
  color:pink[500],
  borderRadius:"15px"
}}
      onClick={handleIncrement}
      >
          +
      </Button>
      <StyledCounterText
       cart={rest.cart}

        type="text"
        value={counterVal}
        id="counterVal"
        onChange={handleInputChange}
              />
      <Button
    disableRipple
      disableTouchRipple
      disableFocusRipple
sx={{
  color:pink[500],
  borderRadius:"15px"
}}
       onClick={handleDecrement}
      >
          -
      </Button>
      </ListItem>     

      )
    
    :
    <ListItem
      sx={{
        gap: "1rem",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      className="counter-section"
    >
      <StyledCounterBtn onClick={handleIncrement} className="Counter-btn">
        +
      </StyledCounterBtn>

      <StyledCounterText
        type="text"
        value={counterVal}
        id="counterVal"
        onChange={handleInputChange}
        readOnly
    
      />
      <StyledCounterBtn onClick={handleDecrement} className="Counter-btn">
        -
      </StyledCounterBtn>
    </ListItem>
    }
    </>
  
  )
});

export default CounterOfThequantitiy;
