import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

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
    console.log(id)
    return fetch(POST_URL + id).then((res) => res.json());
  }
);


export const addNewRoom = createAsyncThunk(
    "userRooms/addRoom",
    async (room: Room, { rejectWithValue }) => {
      try {
        console.log("HHH:", room)
        const response = await axios.post("http://localhost:3001/room/add",null, {params: {...room}} );
        return response.data;
      } catch (error) {
        console.log("POST new room ERROR:", error);
        return rejectWithValue(error);
      }
    }
);

const userSlice = createSlice({
  name: "userRooms",
  initialState,
  reducers: {
    addNewRoom: (state, action: PayloadAction) => {

      },
  },
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
