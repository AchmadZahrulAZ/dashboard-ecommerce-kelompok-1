import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";
import BannerPage from "./BannerPage";
import ProductPage from "./ProductPage";
import CategoryPage from "./CategoryPage";
import HomePage from "./HomePage";
import OrdersPage from "./OrdersPage";
import PromotionPage from "./PromotionPage";
import RatingPage from "./RatingPage";
import StockPage from "./StockPage";

const Dashboard = () => {
  return (
    <Router>
      <SidebarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/banner" element={<BannerPage />} />
        <Route path="/banner/add" element={<BannerPage />} />
        <Route path="/banner/edit/:id" element={<BannerPage />} />
        <Route path="/banner/detail/:id" element={<BannerPage />} />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/add" element={<ProductPage />} />
        <Route path="/product/edit/:id" element={<ProductPage />} />
        <Route path="/product/detail/:id" element={<ProductPage />} />

        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/promotion/add" element={<PromotionPage />} />
        <Route path="/promotion/edit/:id" element={<PromotionPage />} />
        <Route path="/promotion/detail/:id" element={<PromotionPage />} />

        <Route path="/stock" element={<StockPage />} />
        <Route path="/stock/add" element={<StockPage />} />
        <Route path="/stock/edit/:id" element={<StockPage />} />
        <Route path="/stock/detail/:id" element={<StockPage />} />

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
