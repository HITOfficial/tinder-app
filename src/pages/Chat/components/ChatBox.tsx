import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import ChatBubbleRight from "./ChatBubbleRight";
import ChatBubbleLeft from "./ChatBubbleLeft";
import ChatActions from "./ChatActions";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../../redux/slices/MessagesSlice";
import { Message } from "../../../redux/slices/UserRoomsSlice";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { fetchUser } from "../../../redux/slices/UserSlice";
import { useParams } from "react-router-dom";
import { fetchRoomData } from "../../../redux/slices/RoomSlice";
import AuthService from "../../../services/auth.service"
const CardStyle = {
  height: 650,
};

const CardContentStyle = {
  height: 420,
  maxHeight: 420,
  overflowY: "scroll",
  paddingBottom: 10,
};



function ChatBox(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages);
  const user = useSelector((state: RootState) => state.user);
  const room = useSelector((state: RootState) => state.room);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    messages.status === "idle" && dispatch(fetchMessages());
    const currentUser = AuthService.getCurrentUser();
    user.status === "idle" && dispatch(fetchUser( currentUser.user._id));

    if (id !== undefined) {
      console.log(id)
      room.status === "idle" && dispatch(fetchRoomData(id));
    }
  }, [id]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log("Room: ", room.room);
  }, [room]);

 // useEffect(() => {}, [messages]);

  const notLoggedUserSender = (): string => {
    if (
      user.user !== null &&
      room.room !== null &&
      user.user._id.toString() !== room.room.user1
    ) {
      return room.room.user1Avatar;
    } else if (room.room != null) {
      return room.room.user2Avatar;
    }
    return "";
  };

  const loggedUserSender = (): string => {
    if (
      user.user !== null &&
      room.room !== null &&
      user.user._id.toString() !== room.room.user1
    ) {
      return room.room.user2Avatar;
    } else if (room.room != null) {
      return room.room.user1Avatar;
    }
    return "";
  };

  const UserToSendCheck = (): string => {
    if (
      user.user !== null &&
      room.room !== null &&
      user.user._id.toString() !== room.room.user1
    ) {
      return room.room.user2Name;
    } else if (room.room != null) {
      return room.room.user1Name;
    }
    return "";
  };
  
  return (
    <Card sx={CardStyle}>
      {user.user !== null && room.room !== null && (
        <>
          <CardHeader
            action={
              <IconButton>
                <ArrowLeftIcon fontSize="large" />
              </IconButton>
            }
            avatar={<Avatar src={notLoggedUserSender()}></Avatar>}
            title={UserToSendCheck()}
           // subheader="Warsaw"
            sx={{ backgroundColor: "rgb(255, 101, 91)", padding: "10px" }}
          />

          <CardContent sx={CardContentStyle}>
            {room.room != null &&
              room.room.messages.map(
                ({ _id, sender, receiver, message, date }: Message) => {
                  if (user.user != null) {
                    if (
                      sender != user.user._id.toString() &&
                      room.room != null
                    ) {
                      // someone is a sender
                      if (user.user._id.toString() !== sender) {
                        return (
                          <ChatBubbleLeft
                            senderAvatar={notLoggedUserSender()}
                            message={message}
                            key={_id}
                          />
                        );
                      }
                      // i am sender
                    }
                    return (
                      <ChatBubbleRight
                        senderAvatar={loggedUserSender()}
                        message={message}
                        key={id}
                      />
                    );
                  }
                  return;
                }
              )}
          </CardContent>
          <CardActions>
            <ChatActions room={room.room} user={user.user} />
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default ChatBox;
