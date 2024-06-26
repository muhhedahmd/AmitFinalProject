import { Avatar, List, ListItem, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CounterOfThequantitiy from '../CounterOfThequantitiy'
import {  DeleteOutline } from '@mui/icons-material'
import { useCart } from '../Contexts/CartContext'
import { grey } from '@mui/material/colors'
import { StyledDisc } from '../Products/Style'
import { useTheme } from '@emotion/react'
import { formatCurrency } from '../../utils/Currancy'


const CartItem = ({img  ,title  , price , id  , quantity, ...rest} ,props ) => {
    // const {state} = useCart()

    const {DeleteFromCart} = useCart()
    const theme = useTheme()

    const counterRef = useRef();
    const [, setCounterState] = useState(counterRef);
    useEffect(() => {
      setCounterState(counterRef.current);
    }, [setCounterState]);
  
    const isSm = useMediaQuery(theme.breakpoints.down("md"));




  return (
        <List
        disablePadding
        sx={{
            display:"flex",
            justifyContent:"space-between"
            ,alignItems:"center"
        }}
        >
            <ListItem
            sx={{
                width:"fit-content",
                paddingRight:"0"
            }}
            >
            <Avatar sx={{
                width:"5rem",
                height:"5rem"
            }}>

                    <img
                    style={{
                        maxWidth:"100%"
                    }}
                     src={img} alt="" />
            </Avatar>
            </ListItem>    

            <ListItem
            sx={{

                width:"7rem",

                display:"flex"
                ,justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}
            >
                <StyledDisc variant='caption'
                sx={{
                    width:`${isSm ? "6rem" : "max-content"}`
                }}
                 component={"p"}>
                    {title}
                </StyledDisc>
                <Typography
                sx={{
                    color:grey[600]
                }}
                 variant='body2' component={"p"}>
                    catagory
                </Typography>
            </ListItem>  

          
            <ListItem
            sx={{
                width:"fit-content",

            }}
            >
                ${formatCurrency(quantity * price)}
            </ListItem>
            <ListItem
            sx={{
                width:"fit-content"
            }}
            >
                    <CounterOfThequantitiy
                    key={id}
                    item={rest.item}
                    cart={true}
                     ref={counterRef}
                        
                     />
            </ListItem>
 

            <ListItem
            disablePadding
            onClick={()=>DeleteFromCart(id)}

            sx={{
                width:"fit-content",

            }}
            >

                <DeleteOutline

                />
            </ListItem>

       

        </List>
  )
}

export default CartItem