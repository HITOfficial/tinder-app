import React from "react"
import {Button, Fab, styled, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ActionsBox = styled("div")`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`

function ChatActions():JSX.Element {
    return (
        <ActionsBox>
            <TextField
                id="about-me"
                label="New message"
                multiline
                rows={2}
                defaultValue="netflix & chill"
                sx={{width: "80%"}}
                variant="filled"
            />
            <Fab>
                <SendIcon/>
            </Fab>
        </ActionsBox>
    )
}

export default ChatActions;