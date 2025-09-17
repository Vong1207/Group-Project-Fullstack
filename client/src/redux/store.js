/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Tran Gia Vong
// # ID: 4012094 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';

export default configureStore({
    reducer: {
        user: userReducer
    }
});