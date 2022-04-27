import React, {useEffect} from "react"
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Paper, Typography} from "@mui/material";
import ChatBubbleRight from "./ChatBubbleRight";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatActions from "./ChatActions";
import {AppDispatch, RootState} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../../redux/slices/MessagesSlice";
import {Message} from "../../../redux/slices/MessagesSlice";

const CardStyle = {
    height: 650,
}

const CardContentStyle = {
    height: 470,
}

const USER1 = "user1";
const USER2 = "user2";


function ChatBox():JSX.Element {
    const dispatch:AppDispatch = useDispatch();
    const messages = useSelector((state:RootState)=> state.messages);

    useEffect(() => {
        messages.status === "idle" && dispatch(fetchMessages());
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

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
                sx={{backgroundColor: "#facee6"}}
            />

            <CardContent
                sx={CardContentStyle}
            >
                {messages.messages.map(({sender,receiver,senderAvatar, receiverAvatar, message}:Message, id) => {
                    if (sender === USER1 && receiver === USER2){
                       return <ChatBubbleLeft receiverAvatar={receiverAvatar} message={message} key={id}/>
                    } else if (sender === USER2 && receiver === USER1) {
                        return <ChatBubbleRight senderAvatar={senderAvatar} message={message} key={id}/>
                    }
                })}
            </CardContent>
            <CardActions>
                <ChatActions/>
            </CardActions>
        </Card>
    )
}

export default ChatBox;