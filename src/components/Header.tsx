import React from "react";
import Button from "@mui/material/Button"
import {Grid, IconButton, makeStyles} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, NavLink} from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Matches from "../pages/Matches/Matches";
import AuthService from "../services/auth.service"
const HeaderStyles= {
    width: "100%",
    backgroundColor: "#f8f8f8",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
}
import EventBus from "../common/EventBus";



const ActiveStyle = {
    "&.active": {
        color: "rgb(254, 60, 114)"
    }
}


function Header ():JSX.Element {let currentUser = AuthService.getCurrentUser();
    function logOut() {
        AuthService.logout();
        currentUser= undefined
        EventBus.on("logout", logOut);
        window.location.reload();
    }
    
    console.log(currentUser)
    return (
      
            <Grid
                container
            sx={HeaderStyles}
            >
                {currentUser && (  <Grid item>
                    <IconButton
                        component={NavLink}
                        to="profile"
                        sx={ActiveStyle}
                    >
                        <PersonIcon/>
                    </IconButton>
                </Grid>
                )}
                <Grid
                    item
                    justifyContent="center"
                >
                        <IconButton
                            component={NavLink}
                            to="matches"
                            sx={ActiveStyle}>
                            <WhatshotIcon/>
                        </IconButton>
                </Grid>
                <Grid item >
                        <IconButton
                            component={NavLink}
                            to="chat/list"
                            sx={ActiveStyle}>
                            <ChatBubbleIcon/>
                        </IconButton>
                </Grid>
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
                            <LoginIcon />
                        </IconButton>
                    </Grid><Grid item>
                            <IconButton
                                component={NavLink}
                                to="signup"
                                sx={ActiveStyle}>
                                <LoginIcon />
                            </IconButton>
                        </Grid></>
                )}
         </Grid>
        
    )
}

export  default  Header;


