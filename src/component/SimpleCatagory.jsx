import { List, ListItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Style = {

  padding:"1rem" ,
  alignItems:"start"
  

}
const SimpleCatagory = ( {  notHover ,item , key , active , col}) => {
  return (

    <List 

    
    col={col}
    className={`${notHover  ? "" : "drop-down-menu"  } `}
  

    sx={Style}
    
    >
    {item.map((e)=>{
        return(
            <Link  to={`${e.split(" ").join("")}`}>

                {e}
            </Link>
        )
    })}
    </List>
  )
}

export default SimpleCatagory
