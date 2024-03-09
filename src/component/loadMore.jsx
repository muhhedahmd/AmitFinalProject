import { Button } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, {  } from 'react'

const LoadMore = ({state , setState ,  dataLen , dataOfCatogriesLen }) => {
    

    const  handleClick = (state , setState)=>{

        if(dataLen > state )
        {
            let reminder =  dataLen - state
            if(reminder > 5  ){
                setState(prev=> prev + 5 )

            }
            else {
                setState(prev=> prev + reminder )

            }
        }
        
        

    }

  return (
    <>
        <Button 
        onClick={(e)=>handleClick(state , setState)}
        sx={{
            padding: ".5rem",
            textTransform:"none",
              margin: "0.5rem 0 1.5rem 2rem",
             borderRadius: "6px",
    border: 'none',
    background: pink[500],
    color: 'white',
    cursor: 'pointer',
    fontSize:".9rem",
    ':hover':{
    background: pink[400],
    }
        }}
        >
            Load More Related items
        </Button>
    </>

    )
}

export default LoadMore