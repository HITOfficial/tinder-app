import React from "react";
import {Avatar, Box, Card, CardHeader, Typography} from "@mui/material";
import {NewAvatar, NewMatch} from "./ChatList";
import {NavLink} from "react-router-dom";


function ChatElement({name, avatar, message, id}: NewMatch):JSX.Element {
    return (
        <>
            <Card
                component={NavLink}
                to={`../user${id}`}
                sx={{width: "100%", height: 100}}
            >
                <CardHeader
                    avatar={ <NewAvatar src={avatar}/>
                    }
                    title={name}
                    subheader={message}
                />
            </Card>
        </>
    )
}

export default ChatElement;