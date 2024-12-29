import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async (page) => {
    try {
      const response = await axios.get(
        `${API}/category?page=${page}&limit=10`,
        {
          headers: {
            accept: "application/json",
            token:
              "NDphZG1pbjoxNzM1MjIzNDQx.MwxGRM60N6LNcCZOT2arEcq127Zwl3si5y3Ofs3EeDo=",
          },
        }
      );
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
  categories: [],
  total: 0,
  pages: 0,
  currentPage: 0,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
      state.currentPage = action.payload.current_page;
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
