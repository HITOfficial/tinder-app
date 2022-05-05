import React from "react"
import {Avatar, Paper, Typography} from "@mui/material";

const BubbleRightStyle = {
    width:"fit-content",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginLeft:"auto",
    backgroundColor: "rgb(255, 101, 91)",
    paddingLeft:"5px"
}

const AvatarRightStyle = {
    width: 25,
    height: 25,
    margin: 1,
    order: 1
}


interface Sender {
    senderAvatar: string,
    message: string
}

function ChatBubbleRight({senderAvatar, message}: Sender):JSX.Element {
    return (
        <Paper sx={BubbleRightStyle}>
            <Avatar
                alt="Remy Sharp"
                src={senderAvatar}
                sx={AvatarRightStyle}
            />
            <Typography
                variant="subtitle2">
                {message}
            </Typography>
        </Paper>
    )
}

export default ChatBubbleRight;