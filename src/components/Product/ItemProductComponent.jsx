import React from "react";
import DeleteCircle from "../../assets/icons/product/DeleteCircle.svg";
import Default from "../../assets/icons/product/Default.svg";

const ItemProductComponent = ({ defaultItem = false }) => {
  return (
    <div className="relative border rounded-sm hover:shadow-md">
      <img
        src="https://img.freepik.com/premium-photo/floating-computer-laptop-isolated-orange-square-background_118047-17533.jpg"
        alt="Product Name"
        className="w-full h-auto rounded-sm"
      />
      <img
        src={DeleteCircle}
        alt="delete"
        className="absolute p-1 rounded-full top-2 right-2 hover:bg-slate-50"
      />
      {defaultItem && (
        <img
          src={Default}
          alt="defauklt icon"
          className="absolute w-1/4 top-3 left-2"
        />
      )}
    </div>
  );
};
export default ItemProductComponent;
