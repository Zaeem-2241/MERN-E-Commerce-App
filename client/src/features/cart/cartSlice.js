import { createSlice } from "@reduxjs/toolkit";

const cartItem_LocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItem_LocalStorage,
  },
  reducers: {
    // addTOCart: (state, action) => {
    //   const items = { ...action.payload, quantity: 1 };

    //   const existItems = state.cartItems.find((x) => x._id === items._id);
    //   //   console.log([...existItems]);

    //   if (existItems) {
    //     state.cartItems = state.cartItems.map((x) =>
    //       x._id === existItems._id ? { ...x, quantity: x.quantity + 1 } : x,
    //     );
    //   } else {
    //     state.cartItems.push(items);

    //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    //   }
    // },
    addTOCart: (state, action) => {
      const item = { ...action.payload, quantity: 1 };

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // ✅ DON'T auto increase blindly
        existItem.quantity = existItem.quantity + 1;
      } else {
        state.cartItems.push(item);
      }
    },
    increaseQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id == action.payload
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});
export const {
  addTOCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;
export default cartSlice.reducer;
