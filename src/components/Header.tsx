import React, { useState} from "react";
import {Grid, IconButton, Typography} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink} from "react-router-dom";
import AuthService from "../services/auth.service"
const HeaderStyles= {
    width: "100%",
    backgroundColor: "#f8f8f8",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
}



const ActiveStyle = {
    "&.active": {
        color: "rgb(254, 60, 114)"
    }
}


function Header ():JSX.Element {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    function logOut() {
        AuthService.logout();
        setCurrentUser(undefined)
    }

    return (
      
            <Grid
                container
                sx={HeaderStyles}
            >
                {currentUser && (  <><Grid item>
                <IconButton
                    component={NavLink}
                    to="profile"
                    sx={ActiveStyle}
                >
                <PersonIcon />
                </IconButton>
            </Grid><Grid
                item
                justifyContent="center" >
                    <IconButton
                        component={NavLink}
                        to="matches"
                        sx={ActiveStyle}>
                        <WhatshotIcon />
                    </IconButton>
                </Grid><Grid item>
                    <IconButton
                        component={NavLink}
                        to="chat/list"
                        sx={ActiveStyle}>
                        <ChatBubbleIcon />
                    </IconButton>
                </Grid></>)}
                {currentUser ? (
                    <Grid item >
                         <IconButton
                          onClick={logOut}
                          component={NavLink}
                          to="logint"
                          sx={ActiveStyle}>
                        <LogoutIcon/>
                         </IconButton>
                    </Grid>):(
                     <><Grid item>
                        <IconButton
                            
                            component={NavLink}
                            to="logint"
                            sx={ActiveStyle}>
                                <Typography  variant="h6" >Log In</Typography>
                            <LoginIcon />
                        </IconButton>
                    </Grid><Grid item>
                            <IconButton
                                component={NavLink}
                                to="signup"
                                sx={ActiveStyle}>
                                  <Typography  variant="h6" >Sign Up</Typography>
                                <LoginIcon />
                            </IconButton>
                        </Grid></>
                )}
         </Grid>
        
    )
}

export  default  Header;


