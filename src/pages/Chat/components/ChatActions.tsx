import React from "react";
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

function ChatActions({ room, user }: Props): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = handleSubmit((data: any) => {
    console.log(data.message);
    const sender = user._id.toString();
    const receiver = room.user1
      ? user._id.toString() !== room.user1
      : room.user2.toString();

    const message: Message = {
      _id: 123,
      sender: sender,
      receiver: receiver.toString(),
      message: data.message,
      date: Date(),
    };
    // dispatch(addMessage(message));
    // dispatch(postMessage(message));
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
