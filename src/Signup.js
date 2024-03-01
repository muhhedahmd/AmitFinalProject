import { useState } from "react"
import axios, { Axios } from 'axios';
export default function Signup(){
    const [name , setname] =useState("")
    const [email , setemail] =useState("")
    const [password , setpassword] =useState("")
    const [confpassword , setconfpassword] =useState("")
    const [flag  , setflag]  = useState(false)
    const [takenemail ,settakenemail]= useState(false)
    async function submit(e)
    {
        let dataacceptance = true;
        e.preventDefault()
        setflag(true)
        if((name === "" || email.length < 8|| password !== confpassword)){
            dataacceptance  = false
        }else {
            dataacceptance = true
        }
        if(dataacceptance){
             let res = await   axios.post("http://127.0.0.1:8000/api/register" , {
                name:name,
                email :email,
                password:password,
                password_confirmation:confpassword,
            }).then((res)=> {console.log(res.status) 
                settakenemail(false)})
                .catch((err)=>{ err.response.data.message ==="The email has already been taken."?settakenemail(true) :settakenemail(false) })
            }
        }
        
        return (
            <div className="form-holder">
            <form action=""  onSubmit={submit}>
            {takenemail  && flag ?  <p className="error"> <span>The email has already been taken.</span></p>:""}

                <label htmlFor="name">Name</label>
                <input type="text" name="" id="name" placeholder="Enter name..." 
                value={name} onChange={(e)=>{setname(e.target.value)}}/>
                
                {name ===  ""  && flag ?  <p className="error"> <span>plese enter your name   </span></p>:""}

                <label htmlFor="email">Email</label>
                <input type="email" name="" id="email" placeholder="Email..." value={email}
                                onChange={(e)=>{setemail(e.target.value)}}

                />



                <label htmlFor="password">password</label>
                <input  type="password" name="" id="password" placeholder="password..."value={password}
                onChange={(e)=>{setpassword(e.target.value)}}/>
                {password.length < 8   && flag ?  <p className="error"> <span>plese enter vaild password   </span></p>:""}



                <label htmlFor="confpassword">confirm password</label>
                <input type="password" name="" id="confpassword" placeholder="confirm password" value={confpassword}
                    onChange={(e)=>{setconfpassword(e.target.value)}}/>
                {password !== confpassword  && flag ?  <p className="error"> <span>password doesnot match   </span></p>:""}
                
                <button type="submit">Submit</button>
            </form>
        </div>
        )
}