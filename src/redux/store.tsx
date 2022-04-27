import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import messagesSlice from "./slices/MessagesSlice";



export const store = configureStore({
    reducer: {
        messages: messagesSlice,
    },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;