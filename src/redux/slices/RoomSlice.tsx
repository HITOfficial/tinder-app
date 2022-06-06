import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room } from "./UserRoomsSlice";

const POST_URL = "http://localhost:3001/rooms/";

const initialState: {
  room: Room | null;
  status: "idle" | "loading" | "successed" | "failed";
} = { room: null, status: "idle" };

export const fetchRoomData = createAsyncThunk(
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
    builder.addCase(fetchRoomData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchRoomData.fulfilled, (state, action) => {
      state.room = action.payload;
      state.status = "successed";
    });
    builder.addCase(fetchRoomData.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default userSlice.reducer;
