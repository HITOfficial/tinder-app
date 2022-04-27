import React from "react";
import {Paper, styled} from "@mui/material";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList.";


function Chat():JSX.Element {
    return (
        <>
            <ChatList></ChatList>
            {/*<ChatBox></ChatBox>*/}
        </>
    )
}

export default Chat;