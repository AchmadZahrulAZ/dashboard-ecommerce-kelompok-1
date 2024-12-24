import React from "react";
import { useLocation } from "react-router-dom";
import PromotionListComponent from "../components/Promotion/PromotionListComponent";
import PromotionFormComponent from "../components/Promotion/PromotionFormComponent";

const PromotionPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  return (
    <>
      {!isAdd && !isEdit && !isDetail && <PromotionListComponent />}

      {(isAdd || isEdit || isDetail) && (
        <PromotionFormComponent isEdit={isEdit} isDetail={isDetail} />
      )}
    </>
  );
};

export default PromotionPage;
