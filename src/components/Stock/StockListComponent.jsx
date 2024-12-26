import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CalendarIcon from "../../assets/icons/rating/Calendar.svg";
import DropdownIcon from "../../assets/icons/rating/DropdownBig.svg";
import SearchIcon from "../../assets/icons/rating/Search.svg";
import SortIcon from "../../assets/icons/product/SortIcon.svg";
import SortActiveIcon from "../../assets/icons/product/SortIconActive.svg";
import DetailIcon from "../../assets/icons/product/SolidEye.svg";
import EditIcon from "../../assets/icons/product/SolidPencil.svg";
import DeleteIcon from "../../assets/icons/product/SolidTrash.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";


const StockListComponent = ({ stocks, onEdit, onDetail, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const totalPages = Math.ceil(stocks.length / itemsPerPage);

  // Total stock quantity
  const totalStock = stocks.reduce((sum, stock) => sum + stock.quantity, 0);

  // Handle sorting logic
  const sortedStocks = useMemo(() => {
    const sortableStocks = [...stocks];
    if (sortConfig.key) {
      sortableStocks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStocks;
  }, [stocks, sortConfig]);

  // Handle search filter logic
  const filteredStocks = sortedStocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const currentStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      {/* Title Section */}
      <div className="p-10 card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">Stock</h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={PaginationChevronRightIcon} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Stock</span>
            </div>
          </div>
          <Link to="/stock/add" className="py-2 btn btn-danger">
            Add New Stock
          </Link>
        </div>

        {/* Second Row */}
        <div className="flex items-center justify-between mt-6">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button className="w-[48px] h-[40px] rounded-md border bg-white flex items-center justify-center">
              <img src={CalendarIcon} alt="Calendar" />
            </button>
            <div className="flex items-center w-[250px] h-[40px] border rounded-md">
              <input type="text" placeholder="Select Filter" className="w-full px-4 text-sm outline-none" />
              <img src={DropdownIcon} alt="Dropdown" className="mr-4" />
            </div>
            <div className="flex items-center w-[280px] h-[40px] border rounded-md">
              <img src={SearchIcon} alt="Search" className="ml-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[93px] h-[44px] bg-[#EEE4FF] flex flex-col items-end justify-center rounded-md pr-2 py-7">
            <p className="font-lato font-bold text-[#DB4444] text-lg">{totalStock}</p>
            <p className="font-lato font-normal text-[#DB4444] text-sm">Total Stock</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Product Name
                    <img
                      src={
                        sortConfig.key === "name" && sortConfig.direction === "ascending"
                          ? SortActiveIcon
                          : SortIcon
                      }
                      alt="Sort"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("varian")}>
                  <div className="flex items-center gap-1">
                    Varian Product
                    <img
                      src={
                        sortConfig.key === "varian" && sortConfig.direction === "ascending"
                          ? SortActiveIcon
                          : SortIcon
                      }
                      alt="Sort"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("quantity")}>
                  <div className="flex items-center gap-1">
                    Quantity
                    <img
                      src={
                        sortConfig.key === "quantity" && sortConfig.direction === "ascending"
                          ? SortActiveIcon
                          : SortIcon
                      }
                      alt="Sort"
                    />
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.name}</td>
                  <td>{stock.varian}</td>
                  <td>{stock.quantity}</td>
                  <td>
                    <div className="flex gap-2">
                      {/* Detail Button */}
                      <button onClick={() => onDetail(stock)}>
                        <img src={DetailIcon} alt="Detail" />
                      </button>
                      {/* Edit Button */}
                      <button onClick={() => onEdit(stock)}>
                        <img src={EditIcon} alt="Edit" />
                      </button>
                      {/* Delete Button */}
                      <button onClick={() => onDelete(stock.id)}>
                        <img src={DeleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
          <span>
            {currentPage}-{Math.min(currentPage * itemsPerPage, filteredStocks.length)} of{" "}
            {filteredStocks.length}
          </span>
          <div className="flex items-center space-x-1">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="w-[40px] text-center border rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`w-[24px] h-[20px] rounded-md bg-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img src={PaginationChevronLeftIcon} alt="Previous" />
            </button>
            <span>
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-[24px] h-[20px] rounded-md bg-white ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img src={PaginationChevronRightIcon} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockListComponent;
