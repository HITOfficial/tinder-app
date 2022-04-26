import React from "react"
import {Avatar, Paper, Typography} from "@mui/material";

const BubbleRightStyle = {
    width:"fit-content",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginLeft:"auto",
    backgroundColor: "#facee6",
    paddingLeft:"5px"
}

const AvatarRightStyle = {
    width: 25,
    height: 25,
    margin: 1,
    order: 1
}

function ChatBubbleRight():JSX.Element {
    return (
        <Paper sx={BubbleRightStyle}>
            <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                sx={AvatarRightStyle}
            />
            <Typography
                variant="subtitle2">
                Lorem ipsum dolor sit amet
            </Typography>
        </Paper>
    )
}

export default ChatBubbleRight;