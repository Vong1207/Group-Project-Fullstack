/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Tran Gia Vong
// # ID: 4012094 */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { 
        user: null // User object will be set after login or signup
    },
    reducers: {
        // Set the user & Clear user
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setCart: (state, action) => {
            if (state.user) {
                state.user.cart = action.payload;
            }
        },
        setUserAvatar: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
            }
        },

        // Cart reducers
        subtractCartQuantity: (state, action) => {
            const index = action.payload;
            if (state.user && state.user.cart && state.user.cart[index]) {
                if (state.user.cart[index].quantity > 1) {
                    state.user.cart[index].quantity -= 1;
                } else {
                    state.user.cart.splice(index, 1);
                }
            }
        },
        // Add cart quantity
        addCartQuantity: (state, action) => {
            const index = action.payload;
            if (state.user && state.user.cart && state.user.cart[index]) {
                state.user.cart[index].quantity += 1;
            }
        },
        // Input cart quantity directly
        inputCartQuantity: (state, action) => {
            const { index, value } = action.payload;
            if (value === '' || parseInt(value) <= 0) {
                state.user.cart[index].quantity = 1;
            } else {
                state.user.cart[index].quantity = value;
            }
        },
        // Delete a product from cart
        deleteCartProduct: (state, action) => {
            const index = action.payload;
            if (state.user && state.user.cart && state.user.cart[index]) {
                state.user.cart.splice(index, 1);
            }
        },
        // Add product to cart
        addProductToCard: (state, action) => {
            const product = action.payload;

            if (!state.user || !state.user.cart) return;

            const index = state.user.cart.findIndex(item => item.product._id == product._id);
            if (index !== -1) {
                // if there are already a product, increase the quanlity
                state.user.cart[index].quantity += 1;  
            } else {
                // if not, add a new product
                state.user.cart.push({ product, quantity: 1 });
            }
        },
        // Wallet reducers
        updateWalletBalance: (state, action) => {
        if (state.user && typeof action.payload === 'number') {
            state.user.walletBalance = action.payload;
        }
        }
    }
});

export const { 
    setUser, 
    clearUser,
    subtractCartQuantity,
    addCartQuantity,
    inputCartQuantity,
    deleteCartProduct,
    updateWalletBalance,
    addProductToCard,
    setCart,
    setUserAvatar
} = userSlice.actions;

export default userSlice.reducer;