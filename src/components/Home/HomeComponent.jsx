import React from "react";
import EarningMonthComponent from "./EarningMonthComponent";
import SummaryComponent from "./SummaryComponent";
import RevanueComponent from "./RevenueComponent";
import BestItemSalesComponent from "./BestItemSalesComponent";

const HomeComponent = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <SummaryComponent />
        </div>
        <div className="mt-10 col-lg-3 lg:mt-0">
          <EarningMonthComponent />
        </div>
      </div>
      <div className="mt-10 row">
        <div className="col-lg-9">
          <RevanueComponent />
        </div>
        <div className="mt-10 col-lg-3 lg:mt-0">
          <BestItemSalesComponent />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
