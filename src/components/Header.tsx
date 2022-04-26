import React from "react";
import Button from "@mui/material/Button"
import {Grid, IconButton} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {Link} from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Matches from "../pages/Matches/Matches";

const HeaderStyles= {
    width: "100%",
    backgroundColor: "#f8f8f8",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
}


function Header ():JSX.Element {
    return (
        <>
            <Grid
                container

            sx={HeaderStyles}
            >
                <Grid item>
                    <Link to="profile">
                        <IconButton>
                            <PersonIcon/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid
                    item
                    justifyContent="center"
                >
                    <Link to="matches">
                        <IconButton>
                            <WhatshotIcon/>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item >
                    <Link to="chat">
                        <IconButton>
                            <ChatBubbleIcon/>
                        </IconButton>
                    </Link>
                </Grid>
            </Grid >
        </>
    )
}

export  default  Header;
