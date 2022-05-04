import React from "react";
import {Avatar, Box, Card, CardHeader, Typography} from "@mui/material";
import {NewAvatar} from "./ChatList.";


function ChatElement():JSX.Element {
    return (
        <>
            <Card>
                <CardHeader
                    avatar={ <NewAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"/>
                    }
                    title="Anna"
                    subheader="Whats up? :)"
                />
            </Card>
        </>
    )
}

export default ChatElement;