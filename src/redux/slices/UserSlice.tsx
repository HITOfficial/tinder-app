import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const POST_URL = "http://localhost:8000/users/";

export interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  rooms: string[];
  age: string;
  location: string;
  sex: string;
  sexPreference: string;
  description: string;
  gallery: string;
}

const initialState: {
  user: User | null;
  status: "idle" | "loading" | "successed" | "failed";
} = { user: null, status: "idle" };

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userID: string) => {
    return fetch(POST_URL + userID).then((res) => res.json());
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "successed";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default userSlice.reducer;
