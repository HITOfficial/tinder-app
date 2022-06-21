import React, { useEffect } from "react";
import { Button, Fab, styled, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Message } from "../../../redux/slices/UserRoomsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addMessage } from "../../../redux/slices/MessagesSlice";
import { postMessage } from "../../../redux/slices/MessagesSlice";
import { Room } from "../../../redux/slices/UserRoomsSlice";
import { User } from "../../../redux/slices/UserSlice";
import { io } from "socket.io-client";
import { addNewMessage } from "../../../redux/slices/RoomSlice";

const ActionsBox = styled("div")`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FabSend = styled(Fab)`
  transition: background-color 0.4s ease-in-out;
  backgroundcolor: white;
  color: rgb(255, 101, 91);
  &:hover {
    background-color: rgb(255, 101, 91);
    color: white;
  }
`;

interface Props {
  room: Room;
  user: User;
}

const socket = io("http://localhost:3001");

function ChatActions({ room, user }: Props): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch: AppDispatch = useDispatch();
 
useEffect(() => {

  socket.on("load_new_message", (msg) => {
    console.log(msg)
    dispatch(addNewMessage(msg));


  });


 
},[])
  

  const onSubmit = handleSubmit((data: any) => {
    console.log(room);
    const sender = user._id.toString();
    const receiver =
      user._id.toString() !== room.user1
        ? room.user1.toString()
        : room.user2.toString();

    const message: Message = {
      _id: 123,
      sender: sender,
      receiver: receiver,
      message: data.message,
      date: Date(),
    };
    console.log("emit message")
    socket.emit("new_message", {
      room: room._id,//"629b87528cc662bfb1db1aa9",
      message: message,
    });
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <ActionsBox>
        <Controller
          name={"message"}
          control={control}
          rules={{ required: true, minLength: 1, maxLength: 64 }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              onKeyPress={(e) => e.key === "Enter" && onSubmit()}
              id="about-me"
              label="New message"
              multiline
              rows={2}
              value={value}
              sx={{ width: "80%" }}
              variant="filled"
            />
          )}
        />
        <FabSend type="submit" onClick={onSubmit}>
          <SendIcon />
        </FabSend>
      </ActionsBox>
    </form>
  );
}

export default ChatActions;
