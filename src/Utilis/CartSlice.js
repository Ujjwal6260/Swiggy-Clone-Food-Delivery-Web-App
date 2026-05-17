import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        restaurantId: "",
        items: []
    },

    reducers: {

        // Clear Cart
        clearCart: (state) => {

            state.restaurantId = "";
            state.items = [];
        },

        // Add To Cart
        addToCart: (state, action) => {

            const { restaurantId, foodItem } = action.payload;

            // Store restaurant id
            state.restaurantId = restaurantId;

            // Check existing item
            const existingItem = state.items.find(
                (item) => item.itemId === foodItem.itemId
            );

            // If item already exists
            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                // Add new item
                state.items.push({
                    ...foodItem,
                    quantity: 1
                });
            }
        },

        // Increase Quantity
        increaseQuantity: (state, action) => {

            const item = state.items.find(
                (item) => item.itemId === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        // Decrease Quantity
        decreaseQuantity: (state, action) => {

            const item = state.items.find(
                (item) => item.itemId === action.payload
            );

            if (!item) return;

            // Quantity decrease
            if (item.quantity > 1) {

                item.quantity -= 1;

            } else {

                // Remove item
                state.items = state.items.filter(
                    (item) => item.itemId !== action.payload
                );
            }

            // Empty cart => remove restaurantId
            if (state.items.length === 0) {
                state.restaurantId = "";
            }
        }
    }
});

export const {
    clearCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;