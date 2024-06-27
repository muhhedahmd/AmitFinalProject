import styled from "@emotion/styled";
import { AppBar, List, ListItem, Toolbar } from "@mui/material";
import { pink } from "@mui/material/colors";


export const StyledHeader = styled(AppBar)(({theme})=>{
    return {
        backgroundColor:"white",
        zIndex:"5",
        position:"fixed",
        top:"0",
        boxShadow:"1px 1px 1px #ddd",
        'a':{
            textDecoration:"none",
            textAlign:"start",
            color:"#333",
            padding:" 0 0 .5rem  0"
        },
        background:"#fff",
        padding:".5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        [`${theme.breakpoints.down("md")}`]:{
            gap:"0",
            'img':{
                width:"9rem"
            },
          

        },
        // "ul":{
        //     display:"flex",
        //     justifyContent:"center",
        //     alignItems:"center",
        //     color:"#000"
        // }


    }
})
export const StyledToolBar = styled(Toolbar)(({theme})=>{
    return {
        [`${theme.breakpoints.down("md")}`]:{
            gap:"0",
     
        },
        width:"100%",
        gap:"7rem",
        display:"flex" , justifyContent:"space-between" ,alignItems:"center",
        '.operation-list':{
            display:"flex" ,
            justifyContent:"center",
            alignItems:"center",
            gap:"1rem",
            color:"#000"
        }
    }
})

export const StyledHolderList = styled(List)(({theme  , col})=>{
    return {

        [`${theme.breakpoints.down("md")}`]:{
            'li ':{
                padding:".5rem",
            }
            
        },
        '.text-pink':{
            fontWeight:"bold",
            transition:".3s"
        },
        'li:hover .text-pink':{

            color:"#ec4d62e0",
        },
 
    
        position:"relative",

        '.drop-down-menu':{
            fontSize:".9rem",
            alignItems:"flex-start",
            flexDirection:"column"  ,
             position:"absolute" , 
            display:"flex",
           transition:".3s",
           opacity:"0",
           visibility:"hidden",
           width:"max-content",
           top:" 2rem",
           left: "-1rem",
           backgroundColor: "#fff",
           boxShadow: "0px 6px 17px #b2b2b224",
        },
        '.Dro:hover .drop-down-menu':{
            backgroundColor:"#fff",
            opacity:"1",
            visibility:"visible",

        },
        '.Dro:hover .drop-down-menu-nested':{
            backgroundColor:"#fff",
            opacity:"1",
            visibility:"visible",

        },
        '.inner-nested':{
            height: "17rem",
            fontSize:".9rem",
            alignSelf:"flex-start",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            display: "flex",
            flexDirection: "column",

            width: " max-content",
        },
        '.drop-down-menu-nested ul':{
            flexDirection:"column"
        }

        
    }
})


export const StyledShoopinCartIcon = styled(ListItem)(({cartItems})=>{
    if(cartItems){
        // console.log(cartItems, "cartItems")
        return{
            position:"relative",
            cursor: "pointer",
            
        ':before':{
            
            position:"absolute",
            
                content:`"${cartItems}"`,

                    
                    background:pink[600],
                    color:"white",
                    display:"flex "
                    ,justifyContent:"center",
                    alignItems:"center",
                    padding:".5rem",
                    fontSize:".8rem",
                    left: "48%",
                    top: "42%",
                    borderRadius:"50%",
                    height:"1.2rem",
                    width:"1.2rem",
                }
            }
        }

            
    
else {

    return {
        position:"relative",
        cursor: "pointer",
        
        
    }
}
})
export const StyledDropDownMenu = styled(List)(({theme})=>{
    return {
            [theme.breakpoints.down("md")]:{
                top:"60px"
            },
        
        transition:".4s",
       opacity: 0,
        visibility: "hidden",
        position: "absolute",
        top: "3.55rem",
        left: "-2rem",
        backgroundColor: "#ffff",
        minWidth:"max-content",
        width: "58vw",
        display: "flex",
        flexDirection: "column",
        maxHeight: "19rem",
                flexWrap: " wrap",
        borderTop: "1px solid #ddd",
        justifyContent: "flex-start !impotant",
        alignItems: "flex-start !impotant",
        padding: " 1rem 2rem 0rem .5rem",
        overflow: "auto",
                
        "a":{
            transition:".2s"

        },
        "a:hover":{
            color:pink[500]
        }

            
    }
})
export const StyledHolderDropDownMenu = styled(ListItem)(({cartItems})=>{
    return {
        position:"relative",
        cursor:"pointer",
        ":hover .DropDown":{
            opacity: 1,
            visibility: "visible",
        }
            
    }
})