import React from "react"
import {Button, Fab, styled, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Message} from "../../../redux/slices/MessagesSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {addMessage} from "../../../redux/slices/MessagesSlice";
import {postMessage} from "../../../redux/slices/MessagesSlice";

const ActionsBox = styled("div")`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FabSend = styled(Fab)`
  transition: background-color .4s ease-in-out;
  backgroundColor: white;
  color:rgb(255, 101, 91);
  &:hover {
    background-color: rgb(255, 101, 91);
    color: white;
  }
`

interface Inputs {
    message: string;
}

interface Users {
    sender: string,
    receiver: string,
    senderAvatar: string,
    receiverAvatar: string,
}



function ChatActions({sender, receiver, senderAvatar, receiverAvatar} : Users):JSX.Element {
    const  {handleSubmit, control, formState:{errors}} = useForm();
    const dispatch:AppDispatch = useDispatch();


    const onSubmit= handleSubmit((data:any) => {
        console.log(data.message);
        const message: Message = {
            id: Date.now(),
            message: data.message,
            sender: sender,
            receiver: receiver,
            senderAvatar: senderAvatar,
            receiverAvatar: receiverAvatar,
        }
        dispatch(addMessage(message));
        dispatch(postMessage(message));
    });

    return (
        <form
            onSubmit={onSubmit}
            style={{width:"100%"}}>
            <ActionsBox>
                <Controller
                    name={"message"}
                    control={control}
                    rules={{required: true, minLength:1, maxLength:64}}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <TextField
                            onChange={onChange}
                            id="about-me"
                            label="New message"
                            multiline
                            rows={2}
                            value={value}
                            sx={{width: "80%"}}
                            variant="filled"
                        />
                        )}
                     />
                <FabSend
                    type="submit"
                    onClick={onSubmit}
                >
                    <SendIcon/>
                </FabSend>
            </ActionsBox>
        </form  >
    )
}

export default ChatActions;