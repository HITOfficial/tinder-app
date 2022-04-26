import React from "react"
import {Avatar, Paper, Typography} from "@mui/material";

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

function ChatBubbleLeft():JSX.Element {
    return (
        <Paper sx={BubbleLeftStyle}>
            <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                sx={AvatarLeftStyle}
            />
            <Typography
                variant="subtitle2">
                Lorem ipsum
            </Typography>
        </Paper>
    )
}

export default ChatBubbleLeft;