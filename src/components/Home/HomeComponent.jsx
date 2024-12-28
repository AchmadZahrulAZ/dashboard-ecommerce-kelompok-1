import React from "react";
import EarningMonthComponent from "./EarningMonthComponent";
import SummaryComponent from "./SummaryComponent";
import RevanueComponent from "./RevenueComponent";
import BestItemSalesComponent from "./BestItemSalesComponent";

const HomeComponent = () => {
  return (
    <div className="w-full min-h-full flex flex-col px-4">
      <div className="row">
        <div className="col-md-9">
          <SummaryComponent />
        </div>
        <div className="col-md-3">
          <EarningMonthComponent />
        </div>
      </div>
      <div className="mt-10 row">
        <div className="col-md-9">
          <RevanueComponent />
        </div>
        <div className="col-md-3">
          <div className="card">
            <BestItemSalesComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
