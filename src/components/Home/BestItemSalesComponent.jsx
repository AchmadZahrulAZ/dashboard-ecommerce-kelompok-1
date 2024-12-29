import React from "react";
import Items from "../../assets/icons/home/Items.svg";

const BestItemSalesComponent = () => {
  return (
    <div className="card lg:h-[400px]">
      <div className="flex flex-col px-10 py-6 overflow-y-hidden card-body">
        <h1 className="mb-3 text-title-large">Best Item Sales</h1>
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="items-center w-full gap-3 my-2 d-flex justify-content-between"
            >
              <img
                src={Items}
                alt="Items Logo"
                className="w-10 lg:w-14"
                style={{ maxWidth: "50px" }}
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold">Small Bookself</h3>
                <p className="text-sm text-textlightcstm ">Furniture</p>
              </div>
              <h3 className="font-extrabold">
                <i className="bi bi-chevron-right"></i>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestItemSalesComponent;
