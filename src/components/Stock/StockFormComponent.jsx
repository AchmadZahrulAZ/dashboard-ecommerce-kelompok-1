import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/stock/Back.svg";
import ChevronRightIcon from "../../assets/icons/stock/ChevronRight.svg";
import ChevronDownIcon from "../../assets/icons/stock/ChevronDown.svg";

const StockFormComponent = ({ onAddStock, isEdit, isDetail }) => {
  const [product, setProduct] = useState("");
  const [newStock, setNewStock] = useState("");
  const currentStock = 10; // Fixed current stock for simplicity
  const navigate = useNavigate();

  const handleAddStock = () => {
    if (product && newStock) {
      const [name, varian] = product.split(" - ");
      const quantity = currentStock + parseInt(newStock, 10);

      // Call the callback function to add stock
      onAddStock({ name, varian, quantity });

      // Navigate back to the stock list
      navigate("/stock");
    }
  };

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: "1200px", minWidth: "800px" }}>
      <div className="p-10 card" style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <div className="flex items-center mb-4">
          <img src={BackIcon} alt="Back" className="mr-2" />
          <h5 className="font-lato font-medium text-black text-lg">
            {isEdit ? "Edit Stock" : isDetail ? "Detail Stock" : "Add Stock"}
          </h5>
        </div>

        <div className="flex items-center text-sm font-lato text-[#DB4444] mb-4">
          <span>Home</span>
          <img src={ChevronRightIcon} alt="Chevron Right" className="mx-2" />
          <span>Stock</span>
          <img src={ChevronRightIcon} alt="Chevron Right" className="mx-2" />
          <span className="font-semibold">
            {isEdit ? "Edit Stock" : isDetail ? "Detail Stock" : "Add Stock"}
          </span>
        </div>

        <div className="my-4" style={{ height: "1px", backgroundColor: "#DBDCDE", width: "100%" }}></div>

        <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-[48%]">
            <p className="font-lato text-[#030406] text-sm mb-2">Product</p>
            <div className="relative">
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none appearance-none"
              >
                <option value="" disabled>
                  Select Product
                </option>
                <option value="Laptop Pavilion - Warna Hitam">Laptop Pavilion - Warna Hitam</option>
                <option value="Laptop Pavilion - Warna Hijau">Laptop Pavilion - Warna Hijau</option>
                <option value="Laptop Pavilion - Warna Kuning">Laptop Pavilion - Warna Kuning</option>
                <option value="Laptop Pavilion - Warna Merah">Laptop Pavilion - Warna Merah</option>
              </select>
              <img src={ChevronDownIcon} alt="Chevron Down" className="absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="w-full md:w-[48%]">
            <p className="font-lato text-[#030406] text-sm mb-2">Current Stock</p>
            <input
              type="text"
              value={currentStock}
              readOnly
              className="w-full h-[42px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-lg px-4 text-sm font-lato outline-none"
            />
          </div>
        </div>

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

        <div className="flex justify-end space-x-4">
          <button
            className="w-[100px] h-[32px] outline outline-1 rounded-md outline-[#DB4444] text-[#DB4444] font-lato text-sm"
            onClick={() => navigate("/stock")}
          >
            Cancel
          </button>
          <button
            disabled={!product || !newStock}
            onClick={handleAddStock}
            className={`w-[103px] h-[32px] rounded-md text-white ${
              !product || !newStock ? "bg-[#DB4444] opacity-50 cursor-not-allowed" : "bg-[#DB4444] opacity-100"
            }`}
          >
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockFormComponent;
