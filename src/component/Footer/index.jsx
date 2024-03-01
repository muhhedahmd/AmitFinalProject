import { Box, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';


const Footer = () => {
  return (
<Box sx={{
    display:"grid",
    gridTemplateColumns:" repeat(auto-fill , minmax(255px , 1fr))",
    padding:"1rem",

    backgroundColor:"#222",
    gap:"0rem",
}}>
    <List
    sx={{
        gap: "0rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    
    }}
    >
    <ListItem>
        <img src="logo_light.png" alt="" />
    </ListItem>
    <ListItem>
        <Typography
        sx={{
            color:"#FFF"
        }}
         variant='body1' component={"p"}>
        If you are going to use of Lorem Ipsum need to be sure there isn't hidden of text

        </Typography>
    </ListItem>
    <ListItem>
    <List 
    disablePadding
    sx={{
        padding:"0",
        paddingLeft: "inherit",
        display:"flex"
        ,justifyContent:"center",
        alignItems:"center",
        gap:".4rem"
    }}>
        <ListItem
    sx={{
        color:"#fff",
        paddingLeft:"0"
    }}
        >
        <FacebookIcon fontSize='small'/>
        </ListItem>
        
        <ListItem
        
        sx={{
            color:"#fff",
        paddingLeft:"0"
    }}
        >
        <TwitterIcon fontSize='small'/> 
        </ListItem>
        <ListItem
         sx={{
        paddingLeft:"0",
        color:"#fff"
    }}
        >


        <YouTubeIcon fontSize='small'/>
        </ListItem>
        <ListItem
         sx={{
            color:"#fff",
        paddingLeft:"0"
    }}
        >
        <InstagramIcon fontSize='small'/>

        </ListItem>
        <ListItem
         sx={{
            color:"#fff",
        paddingLeft:"0"
    }}
        >
        <GoogleIcon fontSize='small'/> 

        </ListItem>

    </List>
    </ListItem>



    </List>
    
    
    
    <List 
    sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        gap:"1rem",
        color:"#fff",
        flexDirection:"column",
    }}
    >
        <ListItem>
        <Typography variant='body1' component={"p"} sx={
            {
                width:"max-content",
                fontWeight:"bold",
                fontSize:"1.2rem"
            }
        }>

            Useful Links
        </Typography>
        </ListItem>
        <ListItem>
            About Us
        </ListItem>
        <ListItem>
            FAQ
        </ListItem>
        <ListItem>
            Location
        </ListItem>
        <ListItem>
            Affilates
        </ListItem>
        <ListItem>
            Contact
        </ListItem>
    </List>
    <List 
    sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        gap:"1rem",
        color:"#fff",
        flexDirection:"column"
    }}
    >
        <ListItem>
        <Typography variant='body1' component={"p"} sx={
            {
                fontWeight:"bold",
                fontSize:"1.2rem"
            }
        }>

Category
        </Typography>
        </ListItem>
        <ListItem>
        Men

        </ListItem>
        <ListItem>
        Woman

        </ListItem>
        <ListItem>
        Kids

        </ListItem>
        <ListItem>
        Best Saller
        </ListItem>
        <ListItem>
        New Arrivals

        </ListItem>
    </List>
    <List 
    sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        gap:"1rem",
        color:"#fff",
        flexDirection:"column"
    }}
    >
        <ListItem>
        <Typography variant='body1' component={"p"} sx={
            {
                fontWeight:"bold",
                fontSize:"1.2rem"
            }
        }>

My Account

        </Typography>
        </ListItem>
        <ListItem>
        My Account
     </ListItem>
        <ListItem>
        Discount

        </ListItem>
        <ListItem>
        Returns
 
        </ListItem>
        <ListItem>
        Orders History

        </ListItem>
        <ListItem>
        Order Tracking  
        </ListItem>
    </List>
    <List 
    sx={{
        alignSelf:"flex-start",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        gap:"1rem",
        color:"#fff",
        flexDirection:"column"
    }}
    >
        <ListItem>
        <Typography variant='body1' component={"p"} sx={
            {
                fontWeight:"bold",
                fontSize:"1.2rem"
            }
        }>

Contact Info
 
        </Typography>
        </ListItem>
        <ListItem 
               sx={{
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            gap:".5rem"
        }}
        >
        <LocationIcon/>
        123 Street, Old Trafford, New South London , UK

        </ListItem>
        <ListItem
               sx={{
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            gap:".5rem"
        }}
        >
        <EmailIcon/>
        info@sitename.com

         </ListItem>
        <ListItem 
        sx={{
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            gap:".5rem"
        }}
        >
        <PhoneIcon/>
        + 457 789 789 65
        </ListItem>
     
    </List>
  

</Box>
  )
}

export default Footer
