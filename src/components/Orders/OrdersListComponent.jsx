import React, { useState, useEffect } from "react";
import Sort from "../../assets/icons/product/SortIcon.svg";
import SortActive from "../../assets/icons/product/SortIconActive.svg";
import SubtractAccept from "../../assets/icons/orders/SubtractAccept.svg";
import SubtractCancel from "../../assets/icons/orders/SubtractCancel.svg";
import DetailIcon from "../../assets/icons/product/SolidEye.svg";
import Right from "../../assets/icons/rating/Right.svg";
import PaginationChevronDownIcon from "../../assets/icons/rating/PaginationChevronDown.svg";
import PaginationChevronLeftIcon from "../../assets/icons/rating/PaginationChevronLeft.svg";
import PaginationChevronRightIcon from "../../assets/icons/rating/PaginationChevronRight.svg";
import "../Product/ProductStyles.css";
import OrdersModalComponent from "./OrdersModalComponent";
import Swal from "sweetalert2";

const OrdersListComponent = () => {
  {
    /* Category Dummy */
  }
  const [orders, setOrder] = useState([
    {
      id: "ORD-001",
      username: "Mustofa Udin",
      address: "Jl Pangestu Usaha No 11",
      payment: "Gopay",
      amount: 111,
      status: "Created",
    },
    {
      id: "ORD-002",
      username: "Aditya Pratama",
      address: "Jl Bunurasa No 22",
      payment: "Dana",
      amount: 200,
      status: "Process",
    },
    {
      id: "ORD-003",
      username: "Kurnia Maiana",
      address: "Jl Pangestu Usaha No 11",
      payment: "Debit Online",
      amount: 999,
      status: "Canceled",
    },
    {
      id: "ORD-004",
      username: "Burhanudin",
      address: "Jl Bunurasa No 22",
      payment: "Ovo",
      amount: 303,
      status: "Completed",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [status, setStatus] = useState("");

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
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

  const handleCancel = () => {
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
        Swal.fire({
          title: "This orders was successfully declined!",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
        });
      }
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
              {sortedOrders.map((order) => (
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
                          onClick={() => setStatus(order.status)}
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
                          onClick={() => setStatus(order.status)}
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

                        <button type="button" onClick={handleCancel}>
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
          <OrdersModalComponent status={status} />
        </div>
      </div>
    </div>
  );
};

export default OrdersListComponent;
