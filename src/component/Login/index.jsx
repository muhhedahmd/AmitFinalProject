import React, { useState } from 'react'

import * as yup from 'yup';
import { useAuth } from '../Contexts/Authenticated';


const Data = {
  Email:"test@test.com",
  passwoard:"Test##1122"
}
const Login = () => {
  const {login} = useAuth()
  // const [isLooding , setIsLooding] = useState(false)
  // const [error , setError ]=useState('')
  const [inputs, setinputs] = useState({
    Email:"",
    passwoard:""

  })

 const  schema  = yup.object().shape({
    Email:yup.string().email().required("").required(""),
    passwoard:yup.string().max(16).min(6).required(""),
    // passwoard:yup.string().matches(/(^(?=.*[a-zA-Z]+)(?=.*(\d+){3,})(?=.*(\W+){3,})).*$/g).min(6).max(16).min(6).required(""),

})



  const handleSubmit = (e)=>{

    schema.validate({
      Email:inputs.Email,
      passwoard:inputs.passwoard,
    
  } , 
  {abortEarly: false}
  ).then(isValid =>{
        console.log(isValid)
        // console.log(inputs , Data  , )
          if (inputs.Email === Data.Email && inputs.passwoard === Data.passwoard   ) {
            window.localStorage.setItem("token" , JSON.stringify(inputs))
              login()
          }
      
  }).catch((validationErrors) => {
    const errors = {};

      validationErrors.inner.forEach((error) => {

        errors[error.path] = error.message;
      });
      console.log(errors)
    });
    // setIsLooding(true)
   
  
  return e.preventDefault()
    

  }

  
  const handleChange = (e)=>{
    // 
    const {name ,value} = e.target
    setinputs(prevInputs=> ({...prevInputs,[name]:value}))
    console.log(inputs)
  }

  const rightData =()=>{
    setinputs({
      ...Data
    })
  }
  return (
    <div>

    <form>

      <label htmlFor="Email">Email</label>
      <input id='Email' name='Email' type='text' onChange={(e)=>handleChange(e)} value={inputs.Email}   placeholder='Enter your Email....'/>

      <label htmlFor="passwoard">passwoard</label>
      <input id='passwoard' name='passwoard' type='password' onChange={(e)=>handleChange(e)}  value={inputs.passwoard} placeholder='Enter your passwoard'/>

     <button type='submit'  onClick={(e)=>handleSubmit(e)}> Submit</button>
     <button type='button'  onClick={rightData}> Right Data</button>

    </form>


    <div className="info">

    </div>
    </div>
  )
}

export default Login
