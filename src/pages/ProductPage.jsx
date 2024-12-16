import React from "react";
import { useLocation } from "react-router-dom";
import ProductFormComponent from "../components/Product/ProductFormComponent";
import ProductListComponent from "../components/Product/ProductListComponent";

const ProductPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  return (
    <>
      {!isAdd && !isEdit && !isDetail && <ProductListComponent />}

      {(isAdd || isEdit || isDetail) && (
        <ProductFormComponent isEdit={isEdit} isDetail={isDetail} />
      )}
    </>
  );
};

export default ProductPage;
