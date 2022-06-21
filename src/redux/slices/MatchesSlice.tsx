import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User} from "./UserSlice";

const POST_URL = "http://localhost:3001/users";

const initialState: {
  matches: User[];
  status: "idle" | "loading" | "successed" | "failed";
} = { matches: [], status: "idle" };

export const fetchMatches = createAsyncThunk(
    "matches/fetchMatches",
    async () => {
      return fetch(POST_URL ).then((res) => res.json());
    }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatches.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.matches = action.payload ;
      state.status = "successed";
    });
    builder.addCase(fetchMatches.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default matchesSlice.reducer;
