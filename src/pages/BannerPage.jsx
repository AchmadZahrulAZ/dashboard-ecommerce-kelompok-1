import React from "react";
import { useLocation } from "react-router-dom";
import BannerListComponent from "../components/Banner/BannerListComponent";
import BannerFromComponent from "../components/Banner/BannerFormComponent";

const BannerPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");
  
  return (
    <>
      {!isAdd && !isEdit && !isDetail && <BannerListComponent />}

      {(isAdd || isEdit || isDetail) && <BannerFromComponent isEdit={isEdit} isDetail={isDetail} />}
    </>
  );
};

export default BannerPage;