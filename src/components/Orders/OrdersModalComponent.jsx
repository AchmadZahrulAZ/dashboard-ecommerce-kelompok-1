import React, { useState } from "react";

const OrdersModalComponent = ({ order, statusChange }) => {
  return (
    <div
      className="modal fade"
      id="modalFormOrders"
      tabIndex="-1"
      aria-labelledby="modalFormOrdersLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg ">
        <div className="modal-content">
          <div className="flex justify-between border-0 modal-header">
            <h1
              className="font-bold modal-title fs-5 "
              id="modalFormOrdersLabel"
            >
              Detail Orders
            </h1>
            <button
              className={`btn btn-sm px-3 h-8 rounded-full text-white ${
                order?.status === "Created"
                  ? "bg-[#DF7B00] hover:bg-[#DF7B00]/90"
                  : order?.status === "Process"
                  ? "bg-blue-500 hover:bg-blue-500/90"
                  : order?.status === "Canceled"
                  ? "btn-danger"
                  : order?.status === "Completed"
                  ? "btn-success"
                  : ""
              }`}
            >
              {order?.status}
            </button>
          </div>
          <div className="modal-body">
            <div className="space-y-2">
              <div className="flex">
                <span className="font-medium w-44">Customer Name</span>
                <span>EL-5414587</span>
              </div>
              <div className="flex">
                <span className="font-medium w-44">Address</span>
                <span>Jl. Jendral Sudirman No. 13 Bandung, Jawa Barat</span>
              </div>
              <div className="flex">
                <span className="font-medium w-44">Payment Method</span>
                <span>Gopay</span>
              </div>
            </div>
            <div className="mt-4 table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.product.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.amount}</td>
                      <td>${item.unit_price}</td>
                      <td>${item.total_price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2"></td>
                    <td>Sub Total </td>
                    <td>${order?.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {order?.status === "Process" && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tracking Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Tracking Number"
                  className="bg-gray-100 form-control"
                  id="trackingNumber"
                  name="trackingNumber"
                />
              </div>
            )}
          </div>

          <div className="border-0 modal-footer">
            {order?.status === "Completed" || order?.status === "Canceled" ? (
              <button
                type="button"
                className="w-32 btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="w-32 btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="w-32 btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (order?.status === "Created") {
                      statusChange(order.id, "Process");
                    } else if (order?.status === "Process") {
                      statusChange(order.id, "Completed");
                    }
                  }}
                >
                  Accept
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersModalComponent;
