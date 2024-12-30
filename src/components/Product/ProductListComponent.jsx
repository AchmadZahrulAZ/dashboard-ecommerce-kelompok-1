import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Sort from "../../assets/icons/product/SortIcon.svg";
import SortActive from "../../assets/icons/product/SortIconActive.svg";
import EditIcon from "../../assets/icons/product/SolidPencil.svg";
import DetailIcon from "../../assets/icons/product/SolidEye.svg";
import DeleteIcon from "../../assets/icons/product/SolidTrash.svg";
import Right from "../../assets/icons/rating/Right.svg";
import PaginationChevronDownIcon from "../../assets/icons/rating/PaginationChevronDown.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";
import SearchIcon from "../../assets/icons/rating/Search.svg";
import "../Product/ProductStyles.css";

const ProductListComponent = ({
  products,
  onSelectProduct,
  onDeleteProduct,
  onSwitchChange,
}) => {
  // State for current page, items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle sorting logic using useMemo for performance optimization
  const sortedProducts = useMemo(() => {
    const sortableProducts = [...products];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  // Pagination logic to get current products to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle sorting request
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Function to handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      {/* Tittle Section */}
      <div className="p-10 card">
        {/* Title and breadcrumb */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">
              Product
            </h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Product</span>
            </div>
          </div>
          <Link to="/product/add" className="py-2 btn btn-danger">
            Add New Product
          </Link>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                {/* Sortable table headers */}
                <th scope="col" onClick={() => handleSort("name")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Product Name</p>
                    <img
                      src={
                        sortConfig.key === "name" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                {/* ... (other table headers) ... */}
                <th scope="col" onClick={() => handleSort("sku")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>SKU Product</p>
                    <img
                      src={
                        sortConfig.key === "sku" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("stock")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Stock Product</p>
                    <img
                      src={
                        sortConfig.key === "stock" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("category")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Category</p>
                    <img
                      src={
                        sortConfig.key === "category" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("price")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Price</p>
                    <img
                      src={
                        sortConfig.key === "price" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("published")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Published</p>
                    <img
                      src={
                        sortConfig.key === "published" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col " className="items-center gap-1 pb-2 d-flex">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render current products */}
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="text-secondary">{product.name}</td>
                  <td className="text-secondary">{product.sku}</td>
                  <td className="text-secondary">{product.stock}</td>
                  <td className="text-secondary">{product.category}</td>
                  <td className="text-secondary">${product.price}</td>
                  <td>
                    <div className=" form-check form-switch custom-switch form-switch-success">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked={product.published}
                        onChange={(e) =>
                          onSwitchChange(product.id, e.target.checked)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    {/* Action buttons */}
                    <div className="gap-2 d-flex align-content-center align-items-center">
                      {/* Detail button */}
                      <Link to={"/product/detail/" + product.id}>
                        <button onClick={() => onSelectProduct(product)}>
                          <img
                            src={DetailIcon}
                            alt="Detail Button"
                            className="transition-transform hover:scale-110"
                          />
                        </button>
                      </Link>
                      {/* Edit button */}
                      <Link to={"/product/edit/" + product.id}>
                        <button onClick={() => onSelectProduct(product)}>
                          <img
                            src={EditIcon}
                            alt="Edit Button"
                            className="transition-transform hover:scale-110"
                          />
                        </button>
                      </Link>
                      {/* Delete button */}
                      <button onClick={() => onDeleteProduct(product.id)}>
                        <img
                          src={DeleteIcon}
                          alt="Delete Button"
                          className="transition-transform hover:scale-110"
                        />
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
            {indexOfFirstItem + 1}-{indexOfLastItem} of {sortedProducts.length}
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
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
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

export default ProductListComponent;
