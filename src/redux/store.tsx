import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import messagesSlice from "./slices/MessagesSlice";
import { messages } from "./slices/messages";
import userSlice from "./slices/UserSlice";
import UserRoomsSlice from "./slices/UserRoomsSlice";
import RoomSlice from "./slices/RoomSlice";
import matchesSlice from "./slices/MatchesSlice";

export const store = configureStore({
  reducer: {
    messages: messagesSlice,
    [messages.reducerPath]: messages.reducer,
    user: userSlice,
    matches: matchesSlice,
    userRooms: UserRoomsSlice,
    room: RoomSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
