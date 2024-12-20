import React, { useState, useEffect } from "react";
import Sort from "../../assets/icons/product/SortIcon.svg";
import SortActive from "../../assets/icons/product/SortIconActive.svg";
import EditIcon from "../../assets/icons/product/SolidPencil.svg";
import DetailIcon from "../../assets/icons/product/SolidEye.svg";
import DeleteIcon from "../../assets/icons/product/SolidTrash.svg";
import Right from "../../assets/icons/rating/Right.svg";
import PaginationChevronDownIcon from "../../assets/icons/rating/PaginationChevronDown.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";
import { Link } from "react-router-dom";
import "../Product/ProductStyles.css";

const ProductListComponent = () => {
  {
    /* Product Dummy */
  }
  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      sku: "SKU-001",
      name: "Product A",
      stock: 100,
      category: "Electronics",
      price: 900,
      published: true,
    },
    {
      id: "PRD-002",
      sku: "SKU-002",
      name: "Product B",
      stock: 50,
      category: "Clothing",
      price: 990,
      published: false,
    },
    {
      id: "PRD-003",
      sku: "SKU-003",
      name: "Product C",
      stock: 75,
      category: "Books",
      price: 890,
      published: true,
    },
    {
      id: "PRD-004",
      sku: "SKU-004",
      name: "Product D",
      stock: 25,
      category: "Electronics",
      price: 690,
      published: true,
    },
    {
      id: "PRD-005",
      sku: "SKU-005",
      name: "Product E",
      stock: 120,
      category: "Clothing",
      price: 1000,
      published: false,
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
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

  return (
    <div className="container">
      {/* Tittle Section */}
      <div className="p-10 card">
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
          <div>
            <Link to={"/product/add"} className="py-2 btn btn-danger">
              Add New Product
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                <th scope="col" onClick={() => requestSort("name")}>
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
                <th scope="col" onClick={() => requestSort("sku")}>
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
                <th scope="col" onClick={() => requestSort("stock")}>
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
                <th scope="col" onClick={() => requestSort("category")}>
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
                <th scope="col" onClick={() => requestSort("price")}>
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
                <th scope="col" onClick={() => requestSort("published")}>
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
              {sortedProducts.map((product) => (
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
                        // checked={product.published}
                        // disabled
                      />
                    </div>
                  </td>
                  <td>
                    <div className="gap-2 d-flex align-content-center align-items-center">
                      <Link to={"/product/detail/" + product.id}>
                        <img
                          src={DetailIcon}
                          alt="Detail Button"
                          className="transition-transform hover:scale-110"
                        />
                      </Link>
                      <Link to={"/product/edit/" + product.id}>
                        <img
                          src={EditIcon}
                          alt="Edit Button"
                          className="transition-transform hover:scale-110"
                        />
                      </Link>
                      <Link to={"/product/delete/" + product.id}>
                        <img
                          src={DeleteIcon}
                          alt="Delete Button"
                          className="transition-transform hover:scale-110"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
            <span>1-20 of 27</span>
            <div className="flex items-center space-x-4">
              <span>Rows per page: 20</span>
              <img src={PaginationChevronDownIcon} alt="Dropdown" />
              <div className="flex items-center space-x-1">
                <button className="w-[24px] h-[20px] rounded-md bg-white flex items-center justify-center">
                  <img src={PaginationChevronLeftIcon} alt="Previous" />
                </button>
                <span className="text-[#687182]">1/2</span>
                <button className="w-[24px] h-[20px] rounded-md bg-white flex items-center justify-center">
                  <img src={PaginationChevronRightIcon} alt="Next" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
