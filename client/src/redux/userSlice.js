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
        addCartQuantity: (state, action) => {
            const index = action.payload;
            if (state.user && state.user.cart && state.user.cart[index]) {
                state.user.cart[index].quantity += 1;
            }
        },
        inputCartQuantity: (state, action) => {
            const { index, value } = action.payload;
            if (value === '' || parseInt(value) <= 0) {
                state.user.cart[index].quantity = 1;
            } else {
                state.user.cart[index].quantity = value;
            }
        },
        deleteCartProduct: (state, action) => {
            const index = action.payload;
            if (state.user && state.user.cart && state.user.cart[index]) {
                state.user.cart.splice(index, 1);
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
    deleteCartProduct
} = userSlice.actions;

export default userSlice.reducer;