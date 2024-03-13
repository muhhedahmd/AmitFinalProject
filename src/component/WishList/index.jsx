import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Product1 from '../Product1'
import { useCart } from '../Contexts/CartContext'
import { Typography } from '@mui/material'

const WishList = () => {
    
  const {state} = useCart()
  
    return (
        <>
        <Header/>
        <Typography
        variant='h4'
        component={"div"}
        sx={{
          padding:"1.5rem"

        }}
        > 
        Wish List

        </Typography>
      <Product1 Arr={state.wishlist}   wishlist={true}/>
            <Footer/>
        </>

  )
}

export default WishList