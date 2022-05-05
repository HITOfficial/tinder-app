import React from "react";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList";
import {Outlet} from "react-router-dom";


function Chat():JSX.Element {
    return (
        <>
            <Outlet/>
        </>
    )
}

export default Chat;