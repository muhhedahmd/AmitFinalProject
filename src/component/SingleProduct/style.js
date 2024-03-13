import styled from "@emotion/styled"
import { pink } from "@mui/material/colors"
export const StyledCounterBtn = styled.button(({theme})=>{
    return {
        cursor:"pointer",
        padding: ".5rem",
        background: "#87878744",
        border: "none",
        borderRadius: "50%",
        width: "2rem",
        height: "2rem",
        fontSize: "1.3rem",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        
      
    }
})
export const StyledCounterText = styled.input(({theme , cart})=>{
    return {
        color:pink[500],
        border: "none !important",
        // padding: `${cart ? "2rem" : "2rem" }`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"1rem",
        transition:".3s",
        textAlign:"center",
        ':hover , :focus':{
            outline:"none !important",
            // border: ``,

            border: "none !important",

        },
        maxWidth:"5rem"
      
    }
})

