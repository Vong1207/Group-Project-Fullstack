import { createSlice } from '@reduxjs/toolkit';

// Will delete this one when BE function for log in and sign up is finished by Nhan

const initialCartState = {
    products: [
        {
            imageUrl: '/product/rainbowHolo.png',
            productName: 'Rainbow HOLO Playing Cards By TCC Fashion',
            quantity: 2,
            price: 300000
        },
        {
            imageUrl: '/product/orbitBlackHole.png',
            productName: 'Orbit Black Hole Playing Cards',
            quantity: 2,
            price: 380000
        },
        {
            imageUrl: '/product/airlessGen1.jpg',
            productName: 'Wilson Airless Gen1 Basketball',
            quantity: 2,
            price: 65000000
        }
    ],
    checked: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        ...initialCartState,
        checked: initialCartState.products.map(() => false)
    },
    reducers: {
        addQuantity: (state, action) => {
            const index = action.payload;
            state.products[index].quantity += 1;
        },
        subtractQuantity: (state, action) => {
            const index = action.payload;
            
            if (state.products[index].quantity > 1) {
                state.products[index].quantity -= 1;
            } else {
                state.products.splice(index, 1);
                state.checked.splice(index, 1);
            }
        },
        inputQuantity: (state, action) => {
            const { index, quantity } = action.payload;
            state.products[index].quantity = quantity > 0 ? quantity : 1
        },
        deleteProduct: (state, action) => {
            const index = action.payload;
            state.products.splice(index, 1);
            state.checked.splice(index, 1);
        },
        selectProduct: (state, action) => {
            const index = action.payload;

            if (state.checked.length !== state.products.length) {
                state.checked = state.products.map((_, i) => state.checked[i] || false);
            }

            state.checked[index] = !state.checked[index];
        },
        selectAllProducts: (state) => {
            if (state.checked.length !== state.products.length) {
                state.checked = state.products.map((_, i) => state.checked[i] || false);
            }

            const allSelected = state.checked.every(Boolean);
            state.checked = state.checked.map(() => !allSelected);
        }
    }
});

export const { addQuantity, subtractQuantity, inputQuantity, deleteProduct, selectProduct, selectAllProducts } = cartSlice.actions;

export default cartSlice.reducer;