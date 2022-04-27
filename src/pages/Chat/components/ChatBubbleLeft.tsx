import React from "react"
import {Avatar, Paper, Typography} from "@mui/material";
import {Message} from "../../../redux/slices/MessagesSlice";

const BubbleLeftStyle = {
    width:"fit-content",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginRight:"auto",
    paddingRight:"5px"
}

const AvatarLeftStyle = {
    width: 25,
    height: 25,
    margin: 1,
}

interface Receiver {
    receiverAvatar: string,
    message: string
}


function ChatBubbleLeft({receiverAvatar, message}:Receiver):JSX.Element {

    return (
        <Paper sx={BubbleLeftStyle}>
            <Avatar
                alt="Remy Sharp"
                src={receiverAvatar}
                sx={AvatarLeftStyle}
            />
            <Typography
                variant="subtitle2">
                {message}
            </Typography>
        </Paper>
    )
}

export default ChatBubbleLeft;