import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/stock/Back.svg";
import ChevronRightIcon from "../../assets/icons/stock/ChevronRight.svg";
import ChevronDownIcon from "../../assets/icons/stock/ChevronDown.svg";

const StockFormComponent = ({
  onAddStock,
  onEditStock,
  isEdit,
  isDetail,
  initialStock,
}) => {
  const navigate = useNavigate();

  // Hardcoded product options
  const productOptions = [
    "Pavilion Laptop - Color Black",
    "Pavilion Laptop - Color Green",
    "Pavilion Laptop - Color Yellow",
    "Pavilion Laptop - Color Red",
  ];

  // Initialize product state
  const [product, setProduct] = useState(() => {
    if (isEdit || isDetail) {
      return `${initialStock.name} - ${initialStock.varian}`;
    }
    return ""; // Empty for "Add" mode
  });

  // State for current stock and new stock
  const [currentStock, setCurrentStock] = useState(
    isEdit || isDetail ? initialStock.quantity : 0
  );
  const [newStock, setNewStock] = useState("");

  // Handle saving logic
  const handleSave = () => {
    if (newStock && product) {
      if (isEdit) {
        // Update existing stock
        onEditStock({
          ...initialStock,
          quantity: currentStock + parseInt(newStock, 10),
        });
      } else {
        // Add new stock with selected product
        const [name, varian] = product.split(" - ");
        onAddStock({ name, varian, quantity: parseInt(newStock, 10) });
      }
      navigate("/stock");
    }
  };

  // Handle closing logic
  const handleClose = () => {
    navigate("/stock");
  };

  return (
    <div
      className="container mx-auto p-4"
      style={{ maxWidth: "1200px", minWidth: "800px" }}
    >
      <div
        className="p-10 card"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-4">
          <img src={BackIcon} alt="Back" className="mr-2" />
          <h5 className="font-lato font-medium text-black text-lg">
            {isDetail
              ? "Detail Stock"
              : isEdit
              ? "Edit Stock"
              : "Add Stock"}
          </h5>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-lato text-[#DB4444] mb-2">
          <span>Home</span>
          <img src={ChevronRightIcon} alt="Chevron Right" className="mx-2" />
          <span>Stock</span>
          <img src={ChevronRightIcon} alt="Chevron Right" className="mx-2" />
          <span className="font-semibold">
            {isDetail
              ? "Detail Stock"
              : isEdit
              ? "Edit Stock"
              : "Add Stock"}
          </span>
        </div>

        {/* Divider */}
        <div
          className="my-4"
          style={{ height: "1px", backgroundColor: "#DBDCDE", width: "100%" }}
        ></div>

        {/* Form */}
        <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 space-y-4 md:space-y-0">
          {/* Product */}
          <div className="w-full md:w-[48%]">
            <p className="font-lato text-[#030406] text-sm mb-2">Product</p>
            {isDetail ? (
              <div className="relative">
                <input
                  type="text"
                  value={product}
                  readOnly
                  className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none"
                />
              </div>
            ) : (
              <div className="relative">
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  disabled={isEdit}
                  className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none appearance-none"
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {productOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <img
                  src={ChevronDownIcon}
                  alt="Dropdown Icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Current Stock */}
          <div className="w-full md:w-[48%]">
            <p className="font-lato text-[#030406] text-sm mb-2">
              Current Stock
            </p>
            <input
              type="number"
              value={currentStock}
              readOnly
              className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none"
            />
          </div>
        </div>

        {/* New Stock */}
        {!isDetail && (
          <div className="flex flex-wrap md:flex-nowrap justify-between mb-4">
            <div className="w-full md:w-[48%]">
              <p className="font-lato text-[#030406] text-sm mb-2">New Stock</p>
              <input
                type="number"
                placeholder="Enter New Stock"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {isDetail ? (
            <button
              onClick={handleClose}
              className="w-[103px] h-[32px] rounded-md text-white"
              style={{ backgroundColor: "#89868D" }}
            >
              Close
            </button>
          ) : (
            <>
              <button
                className="w-[100px] h-[32px] outline outline-1 rounded-md outline-[#DB4444] text-[#DB4444] font-lato text-sm"
                onClick={() => navigate("/stock")}
              >
                Cancel
              </button>
              <button
                disabled={!product || !newStock}
                onClick={handleSave}
                className={`w-[103px] h-[32px] rounded-md text-white ${
                  !product || !newStock
                    ? "bg-[#DB4444] opacity-50 cursor-not-allowed"
                    : "bg-[#DB4444] opacity-100"
                }`}
              >
                {isEdit ? "Save" : "Add Stock"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockFormComponent;
