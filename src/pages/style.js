import styled from "@emotion/styled";
import { ListItem } from "@mui/material";
import { grey } from "@mui/material/colors";

export const  StyledListItemForPriceSummary = styled(ListItem)(()=>{
    return{
        
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"1rem 0 ",

    }
})
export const  StyledDiscountInp = styled.input(()=>{
    return{
        
        border:" 1px solid rgb(255 9 90)",
        outline:"none !important",
        width:"100%",
        padding:".6rem .2rem .6rem .3rem ",
        color:"rgb(255 9 90)",
        ':hover , :foucs , :focus-visible':{
          border:" 1px solid rgb(255 9 90)",
          outline:"none !important",
        }
        ,'::placeholder':{
            color:grey[500]
        }

    }
})