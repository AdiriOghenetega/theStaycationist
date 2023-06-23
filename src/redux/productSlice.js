import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartDataFromStorage = window.localStorage.getItem("cart");

const initialState = {
  productList: [],
  cartItem: cartDataFromStorage ? [...JSON.parse(cartDataFromStorage)] : [],
  orderList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    setCartData: (state, action) => {
      if (action.payload.length) {
        state.cartItem = [...action.payload];
      } else {
        state.cartItem = [];
      }
    },
    setOrderData: (state, action) => {
      state.orderList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const { details, date } = action.payload;
        state.cartItem = [...state.cartItem, { ...details, date }];
      }
    },
    deleteCartItem: (state, action) => {
      toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    updateCart: (state, action) => {
      const { cartId, date } = action.payload;
      const index = state.cartItem.findIndex((el) => el._id === cartId);
      state.cartItem[index].date = date;
    },
  },
});

export const {
  setDataProduct,
  setCartData,
  setOrderData,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  updateCart,
} = productSlice.actions;

export default productSlice.reducer;
