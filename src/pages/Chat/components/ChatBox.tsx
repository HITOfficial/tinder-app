import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import ChatBubbleRight from "./ChatBubbleRight";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatActions from "./ChatActions";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../redux/slices/MessagesSlice";
import { Message } from "../../../redux/slices/MessagesSlice";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {io} from "socket.io-client";


const CardStyle = {
  height: 650
};

const CardContentStyle = {
  height: 420,
  maxHeight: 420,
  overflowY: "scroll",
  paddingBottom: 10
};

// socket
console.log("chatbx")
const socket = io("http://localhost:3001");
socket.emit("load_room","12345")

socket.on("messages",args => console.log(args));



const USER1 = "user1";
const USER2 = "user2";
const SENDER_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80";
const RECEIVER_AVATAR =
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

function ChatBox(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages);


    useEffect(() => {
    messages.status === "idle" && dispatch(fetchMessages());
  }, []);

  useEffect(() => {
      console.log(messages);
  }, [messages]);

    useEffect(() => {

    }, [messages]);


  return (
    <Card sx={CardStyle}>

        <CardHeader
        action={
          <IconButton>
            <ArrowLeftIcon fontSize="large" />
          </IconButton>
        }
        avatar={<Avatar src={RECEIVER_AVATAR}></Avatar>}
        title="John"
        subheader="Warsaw"
        sx={{ backgroundColor: "rgb(255, 101, 91)", padding: "10px" }}
      />

      <CardContent sx={CardContentStyle}>
        {messages.messages.map(
          (
            {
              sender,
              receiver,
              senderAvatar,
              receiverAvatar,
              message
            }: Message,
            id
          ) => {
            // someone is a sender
            if (sender === USER2 && receiver === USER1) {
              return (
                <ChatBubbleLeft
                  senderAvatar={RECEIVER_AVATAR}
                  message={message}
                  key={id}
                />
              );
              // i am sender
            } else if (sender === USER1 && receiver === USER2) {
              return (
                <ChatBubbleRight
                  senderAvatar={SENDER_AVATAR}
                  message={message}
                  key={id}
                />
              );
            }
          }
        )}
      </CardContent>
      <CardActions>
        <ChatActions
          sender={USER1}
          receiver={USER2}
          senderAvatar={SENDER_AVATAR}
          receiverAvatar={RECEIVER_AVATAR}
        />
      </CardActions>
    </Card>
  );
}

export default ChatBox;
