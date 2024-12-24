import React, { useState } from "react";
import PlusElipse from "../../assets/icons/product/PlusElipse.svg";
import "../Product/ProductStyles.css";
import DeleteIcon from "../../assets/icons/product/SolidTrash.svg";

const ProductModalComponent = () => {
  const [varians, setVarians] = useState([]);
  const [varianName, setVarianName] = useState("");

  const handleAddVarian = () => {
    if (varianName.trim() !== "") {
      setVarians([...varians, varianName]);
      setVarianName("");
    }
  };

  const handleDeleteVarian = (index) => {
    setVarians(varians.filter((_, i) => i !== index));
  };

  return (
    <div
      className="modal fade"
      id="modalFormCategory"
      tabIndex="-1"
      aria-labelledby="modalFormCategoryLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="border-0 modal-header">
            <h1
              className="font-semibold modal-title fs-5 "
              id="modalFormCategoryLabel"
            >
              Add Varian
            </h1>
          </div>
          <div className="modal-body">
            <form className="gap-2 d-flex align-items-center">
              <div className="mb-3 flex-grow-1">
                <label htmlFor="name" className="form-label">
                  Varian Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className="bg-gray-100 form-control"
                  id="name"
                  name="name"
                  value={varianName}
                  onChange={(e) => setVarianName(e.target.value)}
                />
              </div>
              <button className="mt-3" type="button" onClick={handleAddVarian}>
                <img src={PlusElipse} alt="add varian" />
              </button>
            </form>
            <div>
              {/* List Varian */}
              {varians.map((varian, index) => (
                <div className="mb-3">
                  <div
                    key={index}
                    className="flex justify-between bg-red-100 form-control"
                  >
                    <p>{varian}</p>
                    <button
                      type="button"
                      onClick={() => handleDeleteVarian(index)}
                    >
                      <img src={DeleteIcon} alt="delete icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-0 modal-footer">
            <button
              type="button"
              className="w-32 btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="w-32 btn btn-danger"
              data-bs-dismiss="modal"
            >
              Add Varian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalComponent;
