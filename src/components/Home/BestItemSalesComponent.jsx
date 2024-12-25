import React from "react";
import Items from "../../assets/icons/home/Items.svg";

const BestItemSalesComponent = () => {
  return (
    <div className="card-body py-10 px-16">
      <h1 className="text-title-large">Best Item Sales</h1>
      <div className=" d-flex flex-column">
        <div className="w-full gap-4 my-3 d-flex justify-content-between ">
          <img src={Items} alt="" className="w-1/5" />
          <div>
            <h3 className="font-bold">Small Bookself</h3>
            <p className="text-sm text-textlightcstm ">Furniture</p>
          </div>
          <h3 className="font-extrabold">
            <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className="w-full gap-4 my-3 d-flex justify-content-between ">
          <img src={Items} alt="" className="w-1/5" />
          <div>
            <h3 className="font-bold">Small Bookself</h3>
            <p className="text-sm text-textlightcstm ">Furniture</p>
          </div>
          <h3 className="font-extrabold">
            <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className="w-full gap-4 my-3 d-flex justify-content-between ">
          <img src={Items} alt="" className="w-1/5" />
          <div>
            <h3 className="font-bold">Small Bookself</h3>
            <p className="text-sm text-textlightcstm ">Furniture</p>
          </div>
          <h3 className="font-extrabold">
            <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className="w-full gap-4 my-3 d-flex justify-content-between ">
          <img src={Items} alt="" className="w-1/5" />
          <div>
            <h3 className="font-bold">Small Bookself</h3>
            <p className="text-sm text-textlightcstm ">Furniture</p>
          </div>
          <h3 className="font-extrabold">
            <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BestItemSalesComponent;
