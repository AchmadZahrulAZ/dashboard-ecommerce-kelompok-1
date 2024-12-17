import React from "react";

const EarningMonthComponent = () => {
  return (
    <div class="card">
      <div class="card-body py-16">
        <div className="text-center d-flex flex-column">
          <div>
            <h4 className="text-title-large">Total earning this month</h4>
          </div>
          <div className="my-8">
            <h1 className="font-bold text-7xl text-primarycstm">310$</h1>
          </div>
          <div>
            <h5 className="text-textlightcstm text-title-medium">
              total income profit this month
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningMonthComponent;
