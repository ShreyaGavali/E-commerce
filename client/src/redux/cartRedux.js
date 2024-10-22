import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProductSuccess: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addProductFailure: (state) => {

    },
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.products;
      state.quantity = action.payload.products.length; // Set the total number of products in the cart
      state.total = action.payload.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ); // Calculate total price
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteProductStart: (state) => {
      state.status = "loading";
    },
    deleteProductSuccess: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.quantity = action.payload.quantity;
      state.status = "success";
    },
    deleteProductFailure: (state) => {
      state.status = "failed";
      state.error = "Failed to delete product.";
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProductSuccess, addProductFailure, getCartStart, getCartSuccess, getCartFailure, clearCart, deleteProductStart, deleteProductSuccess, deleteProductFailure } = cartSlice.actions;
export default cartSlice.reducer;