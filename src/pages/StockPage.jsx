import React from "react";
import { useLocation } from "react-router-dom";
import StockFormComponent from "../components/Stock/StockFormComponent";
import StockListComponent from "../components/Stock/StockListComponent";

const StockPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  return (
    <>
      {!isAdd && !isEdit && !isDetail && <StockListComponent />}

      {(isAdd || isEdit || isDetail) && (
        <StockFormComponent isEdit={isEdit} isDetail={isDetail} />
      )}
    </>
  );
};

export default StockPage;
