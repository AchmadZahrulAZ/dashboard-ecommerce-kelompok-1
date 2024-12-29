import React from "react";

const EarningMonthComponent = () => {
  return (
    <div className="card lg:h-[300px]">
      <div className="flex flex-col items-center justify-center overflow-hidden text-center card-body py-9">
        <div>
          <h4 className="text-title-large">Total earning this month</h4>
        </div>
        <div className="my-8">
          <h1 className="text-5xl font-semibold lg:text-6xl text-primarycstm">
            310$
          </h1>
        </div>
        <div>
          <h5 className="text-textlightcstm text-title-medium">
            total income profit this month
          </h5>
        </div>
      </div>
    </div>
  );
};

export default EarningMonthComponent;
