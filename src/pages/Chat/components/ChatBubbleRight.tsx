import React from "react"
import {Avatar, Paper, Typography} from "@mui/material";

const BubbleRightStyle = {
    width:"fit-content",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginLeft:"auto",
    backgroundColor: "rgb(255, 101, 91)",
    minHeight: 25,
    padding: 1

}


interface Sender {
    senderAvatar: string,
    message: string
}

function ChatBubbleRight({senderAvatar, message}: Sender):JSX.Element {
    return (
        <Paper sx={BubbleRightStyle}>
            <Typography
                variant="subtitle2">
                {message}
            </Typography>
        </Paper>
    )
}

export default ChatBubbleRight;