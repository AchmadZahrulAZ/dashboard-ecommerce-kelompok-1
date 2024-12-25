import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StockFormComponent from "../components/Stock/StockFormComponent";
import StockListComponent from "../components/Stock/StockListComponent";

const StockPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  // State for stocks
  const [stocks, setStocks] = useState([
    { id: "STK-001", varian: "Warna - Hitam", name: "Laptop HP", quantity: 3 },
    { id: "STK-002", varian: "Warna - Silver", name: "Laptop Lenovo", quantity: 2 },
    { id: "STK-003", varian: "Warna - Merah", name: "Mouse Logitech", quantity: 4 },
    { id: "STK-004", varian: "Warna - Hijau", name: "Keyboard Razer", quantity: 1 },
  ]);

  // Function to handle adding new stock
  const handleAddStock = (newStock) => {
    setStocks((prevStocks) => [
      ...prevStocks,
      {
        id: `STK-${prevStocks.length + 1}`, // Generate unique ID
        varian: newStock.varian,
        name: newStock.name,
        quantity: newStock.quantity,
      },
    ]);
    navigate("/stock"); // Redirect back to stock list
  };

  return (
    <>
      {/* Display Stock List if not adding/editing/detail */}
      {!isAdd && !isEdit && !isDetail && <StockListComponent stocks={stocks} />}

      {/* Show StockFormComponent for Add, Edit, or Detail */}
      {(isAdd || isEdit || isDetail) && (
        <StockFormComponent
          isEdit={isEdit}
          isDetail={isDetail}
          onAddStock={handleAddStock} // Pass the add stock handler
        />
      )}
    </>
  );
};

export default StockPage;
