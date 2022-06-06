import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const POST_URL = "http://localhost:3001/rooms/";

export interface Message {
  _id: number;
  sender: string;
  receiver: string;
  message: string;
  date: string;
}

export interface Room {
  _id: number;
  user1: string;
  user2: string;
  user1Avatar: string;
  user2Avatar: string;
  user1Name: string;
  user2Name: string;
  messages: Message[];
}

const initialState: {
  rooms: Room[];
  status: "idle" | "loading" | "successed" | "failed";
} = { rooms: [], status: "idle" };

export const fetchRoom = createAsyncThunk(
  "rooms/fetchRoom",
  async (id: string) => {
    return fetch(POST_URL + id).then((res) => res.json());
  }
);

const userSlice = createSlice({
  name: "userRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoom.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
      state.status = "successed";
    });
    builder.addCase(fetchRoom.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default userSlice.reducer;
