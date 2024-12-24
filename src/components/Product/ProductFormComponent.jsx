import React from "react";
import { useParams } from "react-router-dom";

const ProductFormComponent = ({ isEdit, isDetail }) => {
  const { id } = useParams();
  return (
    <div>
      {isDetail ? <h1>Detail</h1> : isEdit ? <h1>Edit</h1> : <h1>Add</h1>}
      <p>data = {id}</p>
    </div>
  );
};

export default ProductFormComponent;
