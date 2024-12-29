import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";
import BannerPage from "./BannerPage";
import ProductPage from "./ProductPage";
import CategoryPage from "./CategoryPage";
import HomePage from "./HomePage";
import OrdersPage from "./OrdersPage";
import PromotionPage from "./PromotionPage";
import RatingPage from "./RatingPage";
import StockPage from "./StockPage";

const DashboardWithSidebar = () => {
  const location = useLocation();

  // Map route paths to page names
  const getActivePage = () => {
    if (location.pathname.startsWith("/product")) {
      return "Product";
    } else if (location.pathname.startsWith("/banner")) {
      return "Banner Management";
    } else if (location.pathname.startsWith("/promotion")) {
      return "Promotion";
    } else if (location.pathname.startsWith("/stock")) {
      return "Stock";
    } else if (location.pathname.startsWith("/category")) {
      return "Category";
    } else if (location.pathname.startsWith("/orders")) {
      return "Orders";
    } else if (location.pathname.startsWith("/rating")) {
      return "Rating";
    } else if (location.pathname.startsWith("/home")) {
      return "Home";
    } else {
      return "Home";
    }

    // switch (location.pathname) {
    //   case "/home":
    //     return "Home";
    //   case "/product":
    //   case "/product/add":
    //   case "/product/edit/:id":
    //   case "/product/detail/:id":
    //     return "Product";
    //   case "/category":
    //     return "Category";
    //   case "/orders":
    //     return "Orders";
    //   case "/promotion":
    //   case "/promotion/add":
    //   case "/promotion/edit/:id":
    //   case "/promotion/detail/:id":
    //     return "Promotion";
    //   case "/banner":
    //   case "/banner/add":
    //   case "/banner/edit/:id":
    //   case "/banner/detail/:id":
    //     return "Banner Management";
    //   case "/rating":
    //     return "Rating";
    //   case "/stock":
    //   case "/stock/add":
    //   case "/stock/edit/:id":
    //   case "/stock/detail/:id":
    //     return "Stock";
    //   default:
    //     return "Home";
    // }
  };

  return (
    <div className="flex min-h-screen">
      <SidebarComponent activePage={getActivePage()} />
      <div className="flex-grow px-3 py-12 bg-backgroundcstm">
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
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Router>
      <DashboardWithSidebar />
    </Router>
  );
};

export default Dashboard;
