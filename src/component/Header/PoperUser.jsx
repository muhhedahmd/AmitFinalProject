import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { useAuth } from '../Contexts/Authenticated';
import { Avatar, Button, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { grey } from '@mui/material/colors';

export default function PoperUser() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  const {user , logout} = useAuth()
  return (
    
    <div>
      <ListItem
      disablePadding
      sx={{
        p:".4rem 0 0  0"
      }}
       aria-describedby={id} type="button" onClick={handleClick}>
      <span>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path
                          d="M12,2 C14.7614237,2 17,4.23857625 17,7 C17,9.76142375 14.7614237,12 12,12 C9.23857625,12 7,9.76142375 7,7 C7,4.23857625 9.23857625,2 12,2 Z M12,3.42857143 C10.0275545,3.42857143 8.42857143,5.02755446 8.42857143,7 C8.42857143,8.97244554 10.0275545,10.5714286 12,10.5714286 C13.2759485,10.5714286 14.4549736,9.89071815 15.0929479,8.7857143 C15.7309222,7.68071045 15.7309222,6.31928955 15.0929479,5.2142857 C14.4549736,4.10928185 13.2759485,3.42857143 12,3.42857143 Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M3,18.25 C3,15.763979 7.54216175,14.2499656 12.0281078,14.2499656 C16.5140539,14.2499656 21,15.7636604 21,18.25 C21,19.9075597 21,20.907554 21,21.2499827 L3,21.2499827 C3,20.9073416 3,19.9073474 3,18.25 Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                        ></path>
                        <circle
                          stroke="currentColor"
                          stroke-width="1.5"
                          cx="12"
                          cy="7"
                          r="4.25"
                        ></circle>
                      </g>
                    </svg>
                  </span>
      </ListItem>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
            <Box sx={{
                position:"relative",
              p: 1,  }}>
              <Box
              sx={{
                padding: "1rem .5rem",
    left: "-9rem",
                position:"absolute",
  display:"flex",
  flexDirection:"column",
  justifyContent:"flex-start",
  alignItems:"flex-start"
  ,gap:".78rem",
                borderBottom: "2px solid rgb(255, 0, 81)",
                bgcolor: 'background.paper',
              }}
              >
              <Box
              sx={{
                padding:"0 .2rem",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                gap:"4.7rem",
              }}
              >

                    <Avatar src={user.image}></Avatar>
                    <Typography variant='caption' component={"div"}>
                    {user.username}</Typography>

              </Box>
              <Box
              sx={{
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"flex-start",
                flexDirection:"column",
      
              }}
              >

                    <Typography variant='caption' component={"div"}>
                    Name: {user.firstName}  {user.lastName}</Typography>
                    <Typography variant='caption' component={"div"}>
                    Email: {user.email}  </Typography>



              </Box>

              <Button 
              onClick={()=>logout()}
              fullWidth
              variant='text'
              sx={{
                p:"0",
                fontSize:".9rem",
                color:grey[500],
                textTransform:"capitalize",
                border:`.5px solid ${grey[500]}`
              }}
              >
              Log out
              </Button>
              </Box>
      
            </Box>


          </Fade>
        )}
      </Popper>
    </div>
  );
}

