import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { 
        user: null
    },
    reducers: {
        // Set the user & Clear user
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        // Cart reducers
    }
});

export const { 
    setUser, 
    clearUser
} = userSlice.actions;

export default userSlice.reducer;