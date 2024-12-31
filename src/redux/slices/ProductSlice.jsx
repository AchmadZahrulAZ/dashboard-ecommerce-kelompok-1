import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    try {
      const response = await axios.get(`${API}/product?page=1&limit=10`, {
        headers: {
          accept: "application/json",
          token:
            "NDphZG1pbjoxNzM1MjIzNDQx.MwxGRM60N6LNcCZOT2arEcq127Zwl3si5y3Ofs3EeDo=",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
      } else {
        console.error("Error:", error);
      }
      throw error;
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
