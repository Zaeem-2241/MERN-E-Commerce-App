import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
    "admin/orders",
    async (_, thunkAPI) => {
       const { userInfo} = thunkAPI.getState().auth;

       const config = {
        headers : {
            Authorization : `Bearer ${userInfo.token}`
        },
       };

       const { data } = await axios.get("/api/orders/admin/orders", config);
       console.log(data);
       
       return data;

    }
);

// import { fetchAllOrders } from "./orderThunks";

const initialState = {
  orders: [],   // ✅ REQUIRED
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;