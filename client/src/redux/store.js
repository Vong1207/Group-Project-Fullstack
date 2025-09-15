/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';

export default configureStore({
    reducer: {
        user: userReducer
    }
});