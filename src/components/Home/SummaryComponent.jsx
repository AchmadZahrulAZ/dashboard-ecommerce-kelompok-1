import React from "react";
import Items from "../../assets/icons/home/Items.svg";
import Clicks from "../../assets/icons/home/Clicks.svg";
import Sales from "../../assets/icons/home/Sales.svg";
import Users from "../../assets/icons/home/Users.svg";
const SummaryComponent = () => {
  return (
    <div className="card lg:h-[300px]">
      <div className="py-3 mb-3 card-body lg:px-8">
        <h1 className="mb-3 text-title-large lg:mt-4 ">Summary</h1>

        <div className="row">
          <div className="p-2 col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column ">
                  <div className="d-flex align-items-center ">
                    <img src={Users} alt="User Logo" className="mr-2" />
                    <h5>Users</h5>
                  </div>
                  <div className="my-3">
                    <h1 className="text-3xl font-semibold lg:text-5xl">35K</h1>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column ">
                  <div className="d-flex align-items-center ">
                    <img src={Clicks} alt="User Logo" className="mr-2" />
                    <h5>Orders</h5>
                  </div>
                  <div className="my-3">
                    <h1 className="text-3xl font-semibold lg:text-5xl">40</h1>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column ">
                  <div className="d-flex align-items-center ">
                    <img src={Sales} alt="User Logo" className="mr-2" />
                    <h5>Sales</h5>
                  </div>
                  <div className="my-3">
                    <h1 className="text-3xl font-semibold lg:text-5xl">345$</h1>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column ">
                  <div className="d-flex align-items-center ">
                    <img src={Items} alt="User Logo" className="mr-2" />
                    <h5>Items</h5>
                  </div>
                  <div className="my-3">
                    <h1 className="text-3xl font-semibold lg:text-5xl">68</h1>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;
