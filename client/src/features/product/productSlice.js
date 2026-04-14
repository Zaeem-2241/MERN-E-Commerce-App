import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString();
    //   console.log(query);

      const res = await axios.get(
        `http://localhost:5000/api/products?${query}`,
      );
      console.log(res);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const fetchProductDetails = createAsyncThunk(
  "products/details",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      console.log(res.data);
      
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.products = action.payload;

        if(action.meta.arg.page > 1) {
          state.products = [
            ...state.products,
            ...action.payload.products,
          ];
        } else {
          state.products = action.payload.products;
        }

        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
