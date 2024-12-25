import React, { useState } from "react";

const OrdersModalComponent = ({ status }) => {
  const [product, setProduct] = useState([
    {
      product_name: "HP Pavilion 14-DV0514TX",
      amount: 1,
      unit_price: 950,
      total_price: 950,
    },
    {
      product_name: "HP Pavilion 14-DV0514TX",
      amount: 1,
      unit_price: 950,
      total_price: 950,
    },
    {
      product_name: "HP Pavilion 14-DV0514TX",
      amount: 1,
      unit_price: 950,
      total_price: 950,
    },
  ]);

  const totalPrice = product.reduce(
    (total, item) => total + parseInt(item.total_price),
    0
  );

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
                status === "Created"
                  ? "bg-[#DF7B00] hover:bg-[#DF7B00]/90"
                  : status === "Process"
                  ? "bg-blue-500 hover:bg-blue-500/90"
                  : status === "Canceled"
                  ? "btn-danger"
                  : status === "Completed"
                  ? "btn-success"
                  : ""
              }`}
            >
              {status}
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
                  {product.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.amount}</td>
                      <td>${item.unit_price}</td>
                      <td>${item.total_price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colspan="2"></td>
                    <td>Sub Total </td>
                    <td>${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {status === "Process" && (
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
            {status === "Completed" || status === "Canceled" ? (
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
