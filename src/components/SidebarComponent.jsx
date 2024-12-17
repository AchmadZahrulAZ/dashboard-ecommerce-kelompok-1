import React from "react";
import { useNavigate } from "react-router-dom";

// Import all icons directly
import HomeIcon from "../assets/icons/sidebar/Home.svg";
import HomeActiveIcon from "../assets/icons/sidebar/Home_active.svg";
import ProductIcon from "../assets/icons/sidebar/Product.svg";
import ProductActiveIcon from "../assets/icons/sidebar/Product_active.svg";
import CategoryIcon from "../assets/icons/sidebar/Category.svg";
import CategoryActiveIcon from "../assets/icons/sidebar/Category_active.svg";
import OrdersIcon from "../assets/icons/sidebar/Orders.svg";
import OrdersActiveIcon from "../assets/icons/sidebar/Orders_active.svg";
import PromotionIcon from "../assets/icons/sidebar/Promotion.svg";
import PromotionActiveIcon from "../assets/icons/sidebar/Promotion_active.svg";
import BannerIcon from "../assets/icons/sidebar/BannerManagement.svg";
import BannerActiveIcon from "../assets/icons/sidebar/BannerManagement_active.svg";
import RatingIcon from "../assets/icons/sidebar/Rating.svg";
import RatingActiveIcon from "../assets/icons/sidebar/Rating_active.svg";
import StockIcon from "../assets/icons/sidebar/Stock.svg";
import StockActiveIcon from "../assets/icons/sidebar/Stock_active.svg";

// Import Photo Profile Dummy
import PhotoProfile from "../assets/images/PhotoProfileDummy.png";

const SidebarComponent = ({ activePage }) => {
  const navigate = useNavigate();

  // Navigation items with imported icons
  const navigationItems = [
    { name: "Home", icon: HomeIcon, activeIcon: HomeActiveIcon, path: "/home" },
    {
      name: "Product",
      icon: ProductIcon,
      activeIcon: ProductActiveIcon,
      path: "/product",
    },
    {
      name: "Category",
      icon: CategoryIcon,
      activeIcon: CategoryActiveIcon,
      path: "/category",
    },
    {
      name: "Orders",
      icon: OrdersIcon,
      activeIcon: OrdersActiveIcon,
      path: "/orders",
    },
    {
      name: "Promotion",
      icon: PromotionIcon,
      activeIcon: PromotionActiveIcon,
      path: "/promotion",
    },
    {
      name: "Banner Management",
      icon: BannerIcon,
      activeIcon: BannerActiveIcon,
      path: "/banner",
    },
    {
      name: "Rating",
      icon: RatingIcon,
      activeIcon: RatingActiveIcon,
      path: "/rating",
    },
    {
      name: "Stock",
      icon: StockIcon,
      activeIcon: StockActiveIcon,
      path: "/stock",
    },
  ];

  return (
    <div className="w-[218px] bg-white h-screen shadow-md">
      {/* Top Box with Profile */}
      <div className="bg-[#030406] h-[66px] flex items-center px-4">
        <img
          src={PhotoProfile}
          alt="Profile"
          className="w-[28px] h-[28px] rounded-full mr-3"
        />
        <div className="text-white">
          <p className="text-sm font-medium">Anita Cruz</p>
          <p className="text-xs">anita@commerce.com</p>
        </div>
      </div>

      {/* Navigation Items */}
      <ul className="mt-4">
        {navigationItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center cursor-pointer relative"
            onClick={() => navigate(item.path)}
          >
            {/* Left Box Indicator */}
            {activePage === item.name && (
              <div className="absolute left-0 h-[40px] w-[6px] bg-[#DB4444] rounded-tr-[20px] rounded-br-[20px]"></div>
            )}

            {/* Navigation Content */}
            <div
              className={`flex items-center px-4 py-2 w-full ${
                activePage === item.name
                  ? "text-[#DB4444] font-lato text-body-large"
                  : "text-[#030406] font-lato text-body-large"
              }`}
            >
              <img
                src={activePage === item.name ? item.activeIcon : item.icon}
                alt={item.name}
                className="w-[20px] h-[20px] mr-3"
              />
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
