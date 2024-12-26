import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StockFormComponent from "../components/Stock/StockFormComponent";
import StockListComponent from "../components/Stock/StockListComponent";
import Swal from "sweetalert2";

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

  const [selectedStock, setSelectedStock] = useState(null);

  // Function to handle adding new stock
  const handleAddStock = (newStock) => {
    setStocks((prevStocks) => [
      ...prevStocks,
      {
        id: `STK-${prevStocks.length + 1}`, // Generate unique ID
        ...newStock,
      },
    ]);
    Swal.fire({
      title: `This stock was successfully added`,
      icon: "success",
      customClass: {
        title: "text-2xl font-bold",
      },
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/stock"); // Redirect back to stock list
    });
  };

  // Function to handle editing stock
  const handleEditStock = (updatedStock) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
    Swal.fire({
      title: `This stock was successfully updated.`,
      icon: "success",
      customClass: {
        title: "text-2xl font-bold",
      },
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/stock"); // Redirect back to stock list
    });
  };

  // Function to handle edit button click
  const handleEditClick = (stock) => {
    setSelectedStock(stock); // Set the stock to be edited
    navigate(`/stock/edit/${stock.id}`); // Navigate to edit form
  };

  // Function to handle detail button click
  const handleDetailClick = (stock) => {
    setSelectedStock(stock); // Set the stock to be viewed
    navigate(`/stock/detail/${stock.id}`); // Navigate to detail view
  };

  // Function to handle deleting a stock
  const handleDeleteStock = (stockId) => {
    Swal.fire({
      title: "Delete Stock?",
      text: "Are you sure want to delete this stock?",
      icon: "warning",
      iconHtml: `<i class="bi bi-trash"></i>`,
      customClass: {
        title: "my-title-class",
        cancelButton: "swal2-cancel-outline",
        confirmButton: "swal2-confirm-no-outline",
      },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.id !== stockId)
        );
        Swal.fire({
          title: "This stock was successfully deleted",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {/* Display Stock List */}
      {!isAdd && !isEdit && !isDetail && (
        <StockListComponent
          stocks={stocks}
          onEdit={handleEditClick}
          onDetail={handleDetailClick}
          onDelete={handleDeleteStock}
        />
      )}

      {/* Show Add/Edit/Detail Form */}
      {(isAdd || isEdit || isDetail) && (
        <StockFormComponent
          isEdit={isEdit}
          isDetail={isDetail}
          initialStock={selectedStock}
          onAddStock={handleAddStock}
          onEditStock={handleEditStock}
          products={stocks}
        />
      )}
    </>
  );
};

export default StockPage;
