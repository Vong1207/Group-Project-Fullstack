import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice.js';
import userReducer from './userSlice.js';

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
});