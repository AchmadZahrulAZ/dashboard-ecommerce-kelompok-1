import React from "react";
import DeleteCircle from "../../assets/icons/product/DeleteCircle.svg";
import Default from "../../assets/icons/product/Default.svg";

const ItemProductComponent = ({
  defaultItem = false,
  image,
  onDelete,
  index,
}) => {
  const isImageUrl = (image) => {
    return (
      typeof image === "string" &&
      (image.startsWith("http") || image.startsWith("data:image"))
    );
  };

  return (
    <div className="relative border rounded-sm max-w-60 hover:shadow-md">
      {isImageUrl(image) ? (
        <img
          src={image}
          alt="Product Name"
          className="w-full h-auto rounded-sm"
        />
      ) : (
        <img
          src={image?.url_path || URL.createObjectURL(image)}
          alt="Product Name"
          className="w-full h-auto rounded-sm"
        />
      )}
      <img
        onClick={() => onDelete(index)}
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
