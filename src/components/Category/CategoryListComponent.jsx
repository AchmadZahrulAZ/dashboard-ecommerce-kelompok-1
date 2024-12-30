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
import CategoryModalComponent from "./CategoryModalComponent";
import Swal from "sweetalert2";

const CategoryListComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* Category Dummy */
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

  const [isEdit, setIsEdit] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // State for current page, items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Function to edit category
  const handleEditCategory = (category) => {
    setIsEdit(true);
    setSelectedCategory(category);
  };

  // requestSort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting Category
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

  // Calculate total number of pages
  const totalPages = Math.ceil(category.length / itemsPerPage);

  // Pagination logic to get current category to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategory = sortedCategory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Sweet Alert 2 Delete Category
  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: "Delete Category?",
      text: "Are you sure want to delete this category?",
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
        setCategory(category.filter((cat) => cat.id !== categoryId));
        Swal.fire({
          title: "This category was successfully deleted",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
        });
      }
    });
  };

  //handle switch
  const handleSwitchChange = (categoryId, newPublishedValue) => {
    setCategory((prevCategory) =>
      prevCategory.map((category) =>
        category.id === categoryId
          ? { ...category, published: newPublishedValue }
          : category
      )
    );
    // confirmation alert
    if (!newPublishedValue) {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure want to unpublish this category? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        customClass: {
          title: "my-title-class",
          cancelButton: "swal2-cancel-outline",
          confirmButton: "swal2-confirm-no-outline",
        },
      }).then((result) => {
        if (!result.isConfirmed) {
          setCategory((prevCategory) =>
            prevCategory.map((category) =>
              category.id === categoryId
                ? { ...category, published: true }
                : category
            )
          );
        }
      });
    }
  };

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
            <button
              className="py-2 btn btn-danger"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modalFormCategory"
              onClick={() => setIsEdit(false)}
            >
              Add New Category
            </button>
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
                        checked={category.published}
                        onChange={(e) =>
                          handleSwitchChange(category.id, e.target.checked)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <div className="gap-2 d-flex align-content-center align-items-center">
                      <button
                        onClick={() => handleEditCategory(category)}
                        data-bs-toggle="modal"
                        data-bs-target="#modalFormCategory"
                      >
                        <img src={EditIcon} alt="Edit Button" />
                      </button>

                      <button onClick={() => handleDeleteCategory(category.id)}>
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
            <span>
              {indexOfFirstItem + 1}-{indexOfLastItem} of{" "}
              {sortedCategory.length}
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

          {/* Modal */}
          <CategoryModalComponent
            isEdit={isEdit}
            category={selectedCategory}
            onSaveOrUpdate={(updatedCategory) => {
              if (isEdit) {
                // Update existing category
                setCategory((prevCategory) =>
                  prevCategory.map((cat) =>
                    cat.id === updatedCategory.id ? updatedCategory : cat
                  )
                );
              } else {
                // Add new category
                setCategory((prevCategory) => [
                  ...prevCategory,
                  updatedCategory,
                ]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryListComponent;
