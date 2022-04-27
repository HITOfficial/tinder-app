import React from "react";
import {Avatar, Box, Card, CardHeader, Stack, Typography} from "@mui/material";

const CardStyle = {
    height: 650,
}

const CardContentStyle = {
    height: 420,
    maxHeight: 420,
    overflowY: "scroll",
    paddingBottom: 10,
}

const avatars: string[] = [

]


function ChatList():JSX.Element {
    return (
        <Card sx={CardStyle}>
            <Box>
                <Typography variant={"caption"} display="block">
                    New matches
                </Typography>
                <Stack direction="row" spacing={2}>
                    {/*<Avatar {...stringAvatar('Kent Dodds')} />*/}
                    {/*<Avatar {...stringAvatar('Jed Watson')} />*/}
                    {/*<Avatar {...stringAvatar('Tim Neutkens')} />*/}
                </Stack>
            </Box>
        </Card>
    )
}

export default ChatList;