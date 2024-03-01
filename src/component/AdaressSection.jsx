import { Box, Button, FormControl, FormLabel, List, TextField, Typography, colors } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, { useState } from 'react'

const AdaressSection = ({ setStepsState}) => {
    const [err , setErr] = useState({
        LastName: false,
        FirstName:false,
        Adress:false,
        PhoneNumber:false

    })
    const EmptyData = {
        LastName: "",
        FirstName:"",
        Adress:"",
        PhoneNumber:""
    }
    const [data , setData] =useState({...EmptyData})

    const handleChange =(e)=>{
        const {id , value}= e.target

        setData((prev)=>{
            return{
                    ...prev , 
                    [id]:value
            }
        })


    }

    const handleSubmit= (e)=>{


        Object.keys(data).map((e)=>{
            if (data[e] ===  ""){
                setErr((prev)=>{return {...prev , [e]:false}});
            }
            else {
                setErr(true)
            }
        })
       if(Object.values(err).every(e=> e=== true)){

           setStepsState((prev) => (prev < 3 ? prev + 1 : prev))
       
     }

        


        return e.preventDefault()
    }


  return (

<form 
onSubmit={(e) =>handleSubmit(e) }
style={{

    width:"100%"
    ,boxShadow:"none",
    margin:"1rem 0 ",
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    gap:"1rem",
    '& input':{
        ':hover , :focus':{
            border:"none !important"
        }
    }
}}
 action="">

<Typography 
padding={"0"}
variant='subtitle1'
component={"p"}
>
User Info 
</Typography>
  {(Object.values(err).findIndex((e)=>( (e === false )  )) !== -1 )  ? 
  <Typography
  sx={{
    width:'100%'
  }}
   variant='caption'
   component={"p"}
    color='error'>
    some information is not valid
    in

    {Object.keys(err).map((ele)=>{
        return " "+ ele +" "
    })}

  </Typography>

  :""}
<Box
sx={{
    width:"100%",
    gap:"1rem",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"flex-end",
    
}}
>


  <FormControl 
  fullWidth
  >
  <FormLabel
  htmlFor='FirstName'
  >
    First Name
  </FormLabel>
    <TextField
    onChange={(e)=>handleChange(e)}
    value={data.FirstName}
    id='FirstName'  variant="standard" />
 
  </FormControl>
  <FormControl 
  fullWidth
  >
  <FormLabel htmlFor='LastName'>
    Last Name
  </FormLabel>
    <TextField 
        onChange={(e)=>handleChange(e)}
    value={data.LastName}
     variant="standard" id="LastName"/>
 
  </FormControl>
</Box>

<FormControl 
fullWidth
  >
  <FormLabel id='Adress'>
    Adress
  </FormLabel>
    <TextField 
    // color={pink[600]}
    sx={{color:pink[500]}}
        onChange={(e)=>handleChange(e)}
    value={data.Adress}
    id="Adress" variant='standard'/>
 
  </FormControl>

  <FormControl
  fullWidth 
  >
  <FormLabel
  htmlFor='PhoneNumber'
  >
    Phone number
  </FormLabel>
    <TextField
    sx={{':after':{
        borderBottom: `2px solid ${pink[500]}`
    }}}
    inputProps={{
        color:pink[500],
        
        }
    }
        onChange={(e)=>handleChange(e)}
    value={data.PhoneNumber}
     id='PhoneNumber' type='tel' variant='standard'/>
 
  </FormControl>

  <Button 
    fullWidth
  type='submit'
    sx={{
        bgcolor:pink[500],
        color:"#fff",
        ':hover ':{
        bgcolor:pink[500],
        color:"#fff",
        }
    }}
  >
  continue
  </Button>

</form>

  )
}

export default AdaressSection