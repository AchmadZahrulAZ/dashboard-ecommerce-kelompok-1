import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/slices/CategorySlice";
import productReducer from "../redux/slices/ProductSlice";
import ordersReducer from "../redux/slices/OrdersSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    orders: ordersReducer,
  },
});
