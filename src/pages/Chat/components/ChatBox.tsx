import React from "react"
import {Avatar, Button, Card, CardContent, CardHeader, Paper, Typography} from "@mui/material";

const CardStyle = {
    height: 600
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
            >
                <Paper sx={{width:"fit-content", display: "flex", alignItems: "center", margin: "10px 0 auto 0", backgroundColor: "#facee6"}}>
                    <Typography
                        variant="subtitle2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dignissimos nisi temporibus! Blanditiis.
                    </Typography>
                </Paper>

                <Paper sx={{width:"fit-content", display: "flex", alignItems: "center", margin: "10px auto 0 0"}}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        sx={{ width: 25, height: 25, margin: 1 }}
                    />
                    <Typography
                        variant="subtitle2">
                        Lorem
                    </Typography>
                </Paper>

                <Paper sx={{width:"fit-content", display: "flex", alignItems: "center", marginTop: "10px", marginLeft:"auto", backgroundColor: "#facee6"}}>

                    <Typography
                        variant="subtitle2">
                        Lorem ipsum dolor sit amet
                    </Typography>

                </Paper>

            </CardContent>
        </Card>
    )
}

export default ChatBox;