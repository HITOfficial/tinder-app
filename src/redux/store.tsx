import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import messagesSlice from "./slices/MessagesSlice";
import { messages } from "./slices/messages";
import userSlice from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    [messages.reducerPath]: messages.reducer,
    user: userSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
