import React, { useState, useEffect } from "react";
import Sort from "../../assets/icons/product/SortIcon.svg";
import SortActive from "../../assets/icons/product/SortIconActive.svg";
import EditIcon from "../../assets/icons/product/SolidPencil.svg";
import DeleteIcon from "../../assets/icons/product/SolidTrash.svg";
import Right from "../../assets/icons/rating/Right.svg";
import PaginationChevronDownIcon from "../../assets/icons/rating/PaginationChevronDown.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";
import "../Product/ProductStyles.css";

const CategoryListComponent = () => {
  {
    /* Category Dummy */
  }
  const [category, setCategory] = useState([
    {
      id: "CTG-001",
      name: "Electronic",
      icon: "Electronic",
      published: true,
    },
    {
      id: "CTG-002",
      name: "Home & Lifestle",
      icon: "Home & Lifestyle",
      published: false,
    },
    {
      id: "CTG-003",
      name: "Fashion",
      icon: "Fashion",
      published: true,
    },
    {
      id: "CTG-004",
      name: "Beauty",
      icon: "Beauty",
      published: false,
    },
    {
      id: "CTG-005",
      name: "Sports",
      icon: "Sports",
      published: true,
    },
    {
      id: "CTG-006",
      name: "Books",
      icon: "Books",
      published: false,
    },
    {
      id: "CTG-007",
      name: "Toys",
      icon: "Toys",
      published: true,
    },
    {
      id: "CTG-008",
      name: "Health",
      icon: "Health",
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

  const sortedCategory = React.useMemo(() => {
    let sortableCategory = [...category];
    if (sortConfig.key !== null) {
      sortableCategory.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategory;
  }, [category, sortConfig]);

  return (
    <div className="container">
      {/* Tittle Section */}
      <div className="p-10 card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">
              Category
            </h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Category</span>
            </div>
          </div>
          <div>
            <button className="py-2 btn btn-danger">Add New Category</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                <th scope="col" onClick={() => requestSort("name")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Category Name</p>
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
                <th scope="col" onClick={() => requestSort("icon")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Category Icon</p>
                    <img
                      src={
                        sortConfig.key === "icon" &&
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
              {sortedCategory.map((category) => (
                <tr key={category.id}>
                  <td className="text-secondary">{category.name}</td>
                  <td className="text-secondary">{category.icon}</td>
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
                      <button>
                        <img
                          src={EditIcon}
                          alt="Edit Button"
                          className="transition-transform hover:scale-110"
                        />
                      </button>
                      <button>
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

export default CategoryListComponent;
