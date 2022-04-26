import React from "react"
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Paper, Typography} from "@mui/material";
import ChatBubbleRight from "./ChatBubbleRight";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatActions from "./ChatActions";

const CardStyle = {
    height: 650,
}

const CardContentStyle = {
    height: 470,
}


function ChatBox():JSX.Element {
    return (
        <Card sx={CardStyle}>
            <CardHeader
                avatar={
                    <Avatar
                        src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80">
                    </Avatar>
                }
                title="John"
                subheader="Warsaw"
            />

            <CardContent
                sx={CardContentStyle}
            >
                <ChatBubbleLeft/>

                <ChatBubbleRight/>
            </CardContent>
            <CardActions>
                <ChatActions/>
            </CardActions>
        </Card>
    )
}

export default ChatBox;