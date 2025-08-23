import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSession = createAsyncThunk("user/fetchSession", async () => {
    const response = await axios.get("http://localhost:3000/api/session", { withCredentials: true });
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
        },
        addToCart: (state, action) => {
            if (state.user) {
                state.user.cart.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            if (state.user) {
                state.user.cart = state.user.cart.filter((item, idx) => idx !== action.payload);
            }
        },
        updateCartQuantity: (state, action) => {
            const { index, quantity } = action.payload;
            if (state.user && state.user.cart[index]) {
                state.user.cart[index].quantity = quantity;
            }
        },
        clearCart: (state) => {
            if (state.user) {
                state.user.cart = [];
            }
        }
    }
});

export const { setUser, clearUser, addToCart, removeFromCart, updateCartQuantity, clearCart } = userSlice.actions;

export default userSlice.reducer;