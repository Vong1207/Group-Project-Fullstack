import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSession = createAsyncThunk("user/fetchSession", async () => {
    const response = await axios.get("/api/session", { withCredentials: true });
    return response.data.loggedIn ? response.data.user : null;
});

const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;