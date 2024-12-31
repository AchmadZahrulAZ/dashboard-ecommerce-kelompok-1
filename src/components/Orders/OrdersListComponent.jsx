import React, { useState, useMemo } from "react";
import Sort from "../../assets/icons/product/SortIcon.svg";
import SortActive from "../../assets/icons/product/SortIconActive.svg";
import SubtractAccept from "../../assets/icons/orders/SubtractAccept.svg";
import SubtractCancel from "../../assets/icons/orders/SubtractCancel.svg";
import DetailIcon from "../../assets/icons/product/SolidEye.svg";
import Right from "../../assets/icons/rating/Right.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";
import "../Product/ProductStyles.css";
import OrdersModalComponent from "./OrdersModalComponent";
import Swal from "sweetalert2";

const OrdersListComponent = () => {
  /* Order Dummy */
  const [orders, setOrder] = useState([
    {
      id: "ORD-001",
      username: "Mustofa Udin",
      address: "Jl Pangestu Usaha No 11",
      payment: "Gopay",
      amount: 111,
      status: "Created",
      product: [
        {
          product_name: "HP Pavilion 14-DV0514TX",
          amount: 1,
          unit_price: 850,
          total_price: 850,
        },
        {
          product_name: "HP Gemini 222030-100",
          amount: 1,
          unit_price: 350,
          total_price: 350,
        },
        {
          product_name: "Acer Rock",
          amount: 1,
          unit_price: 250,
          total_price: 250,
        },
      ],
      total: 1450,
    },
    {
      id: "ORD-002",
      username: "Aditya Pratama",
      address: "Jl Bunurasa No 22",
      payment: "Dana",
      amount: 200,
      status: "Process",
      product: [
        {
          product_name: "Lenovo Ideapad Slim 3",
          amount: 1,
          unit_price: 7500,
          total_price: 7500,
        },
      ],
      total: 7500,
    },
    {
      id: "ORD-003",
      username: "Kurnia Maiana",
      address: "Jl Pangestu Usaha No 11",
      payment: "Debit Online",
      amount: 999,
      status: "Canceled",
      product: [
        {
          product_name: "Samsung Galaxy A54",
          amount: 1,
          unit_price: 5000,
          total_price: 5000,
        },
        {
          product_name: "Samsung Galaxy Buds 2 Pro",
          amount: 1,
          unit_price: 2000,
          total_price: 2000,
        },
      ],
      total: 7000,
    },
    {
      id: "ORD-004",
      username: "Burhanudin",
      address: "Jl Bunurasa No 22",
      payment: "Ovo",
      amount: 303,
      status: "Completed",
      product: [
        {
          product_name: "Xiaomi Redmi Note 12",
          amount: 2,
          unit_price: 2500,
          total_price: 5000,
        },
        {
          product_name: "Xiaomi Redmi Buds 4 Pro",
          amount: 1,
          unit_price: 800,
          total_price: 800,
        },
      ],
      total: 5800,
    },
    {
      id: "ORD-005",
      username: "Aisyah Putri",
      address: "Jl Mawar Melati No 9",
      payment: "LinkAja",
      amount: 550,
      status: "Created",
      product: [
        {
          product_name: "Asus Vivobook Pro 14 OLED",
          amount: 1,
          unit_price: 12000,
          total_price: 12000,
        },
      ],
      total: 12000,
    },
    {
      id: "ORD-006",
      username: "Rahmat Hidayat",
      address: "Jl Cempaka Putih No 33",
      payment: "Credit Card",
      amount: 777,
      status: "Process",
      product: [
        {
          product_name: "Apple Macbook Pro 14",
          amount: 1,
          unit_price: 25000,
          total_price: 25000,
        },
        {
          product_name: "Apple Magic Mouse",
          amount: 1,
          unit_price: 1500,
          total_price: 1500,
        },
      ],
      total: 26500,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // State for current page, items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Function to handle sorting of the orders
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorts the orders based on the sort configuration
  const sortedOrders = useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  // Calculate total number of pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Pagination logic to get current order to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrder = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Function to handle order cancellation with SweetAlert2 confirmation
  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure want to decline this order?",
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
      if (result.isConfirmed) {
        setOrder(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
        Swal.fire({
          title: "This order was successfully declined!",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
        });
      }
    });
  };

  // Function to handle the change of order status
  const handleStatusChange = (orderId, newStatus) => {
    setOrder((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    Swal.fire({
      title: "Order status updated successfully!",
      icon: "success",
      customClass: {
        title: "text-2xl font-bold",
      },
      showConfirmButton: false,
    });
  };

  return (
    <div className="container">
      {/* Tittle Section */}
      <div className="p-10 card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">
              Orders
            </h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Orders</span>
            </div>
          </div>
          <div>
            <button className="py-2 btn btn-outline-danger">
              Download All
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                <th scope="col" onClick={() => requestSort("username")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>User Name</p>
                    <img
                      src={
                        sortConfig.key === "username" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort("address")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Address</p>
                    <img
                      src={
                        sortConfig.key === "address" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort("payment")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Payment Method</p>
                    <img
                      src={
                        sortConfig.key === "payment" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort("amount")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Amount</p>
                    <img
                      src={
                        sortConfig.key === "amount" &&
                        (sortConfig.direction === "ascending" ||
                          sortConfig.direction === "descending")
                          ? SortActive
                          : Sort
                      }
                      alt="Icon Sort"
                    />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort("status")}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Status Order</p>
                    <img
                      src={
                        sortConfig.key === "status" &&
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
              {currentOrder.map((order) => (
                <tr key={order.id}>
                  <td className="text-secondary">{order.username}</td>
                  <td className="text-secondary">{order.address}</td>
                  <td className="text-secondary">{order.payment}</td>
                  <td className="text-secondary">${order.amount}</td>

                  <td className="text-secondary">
                    <button
                      className={`btn btn-sm px-3 h-8 rounded-full text-white ${
                        order.status === "Created"
                          ? "bg-[#DF7B00] hover:bg-[#DF7B00]/90"
                          : order.status === "Process"
                          ? "bg-blue-500 hover:bg-blue-500/90"
                          : order.status === "Canceled"
                          ? "btn-danger"
                          : order.status === "Completed"
                          ? "btn-success"
                          : ""
                      }`}
                    >
                      {order.status}
                    </button>
                  </td>
                  <td>
                    {order.status === "Canceled" ||
                    order.status === "Completed" ? (
                      <div className="gap-2 d-flex align-content-center align-items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#modalFormOrders"
                        >
                          <img
                            src={DetailIcon}
                            alt="Detail Button"
                            className="transition-transform hover:scale-110"
                          />
                        </button>
                      </div>
                    ) : (
                      <div className="gap-3 d-flex align-content-center align-items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#modalFormOrders"
                        >
                          <img
                            src={SubtractAccept}
                            alt="Accept Button"
                            className="transition-transform hover:scale-110"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCancel(order.id)}
                        >
                          <img
                            src={SubtractCancel}
                            alt="Cancel Button"
                            className="transition-transform hover:scale-110"
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
            <span>
              {indexOfFirstItem + 1}-{indexOfLastItem} of {sortedOrders.length}
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

          <OrdersModalComponent
            order={selectedOrder}
            statusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersListComponent;
