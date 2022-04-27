import {createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit";

const POST_URL = "http://localhost:8000/messages";

export interface Message {
    sender: string,
    receiver: string,
    senderAvatar: string,
    receiverAvatar: string;
    message: string;
}


const initialState : {messages:Message[], status: "idle" | "loading" | "successed" | "failed"} =  {messages: [],status:"idle"};


export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async () => {
        return fetch(POST_URL).then(res => res.json())
    })

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers : {
        addMessage: (state,action:PayloadAction<Message>)  => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchMessages.pending, (state,action) => {
            state.status = "loading";
        })
        builder.addCase(fetchMessages.fulfilled, (state,action) => {
            state.messages = action.payload;
            state.status = "successed";
        })
        builder.addCase(fetchMessages.rejected, (state,action) => {
            state.status = "failed";
        })
    })
})


export default messagesSlice.reducer;
export const {addMessage} = messagesSlice.actions;
