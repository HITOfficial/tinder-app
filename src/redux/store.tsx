import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import messagesSlice from "./slices/MessagesSlice";
import {messages} from "./slices/messages";



export const store = configureStore({
    reducer: {
        messages: messagesSlice,
        // [messages.reducerPath]: messages.reducer,
        [messages.reducerPath]: messages.reducer,

    },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;