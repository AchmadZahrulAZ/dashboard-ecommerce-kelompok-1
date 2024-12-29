import React, { useState } from "react";
import Download from "../../assets/icons/product/Download.svg";
import Image from "../../assets/icons/category/Image.svg";
import DeleteIcon from "../../assets/icons/category/SolidTrashRed.svg";
import Swal from "sweetalert2";
import "../Product/ProductStyles.css";

const CategoryModalComponent = ({ isEdit }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("Electronic");
  const handleSaveOrUpdate = () => {
    Swal.fire({
      title: isEdit
        ? "This category was successfully updated"
        : "This category was successfully added",
      icon: "success",
      customClass: {
        title: "text-2xl font-bold",
      },
      showConfirmButton: false,
    });
  };
  return (
    <div
      className="modal fade"
      id="modalFormCategory"
      tabIndex="-1"
      aria-labelledby="modalFormCategoryLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="border-0 modal-header">
            <h1
              className="font-bold modal-title fs-5 "
              id="modalFormCategoryLabel"
            >
              {isEdit ? "Edit Category" : "Add Category"}
            </h1>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className="bg-gray-100 form-control"
                  id="name"
                  name="name"
                  value={isEdit ? name : ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="px-3 py-4 bg-gray-100 card">
                  <h5 className="mb-4">Category Icon</h5>
                  <label
                    htmlFor="upload"
                    className="flex flex-col items-center justify-center max-w-full py-3 text-base font-semibold text-gray-500 bg-gray-100 border-dashed rounded cursor-pointer border-3 border-primarycstm "
                  >
                    <img src={Download} alt="upload image" />
                    <div className="flex">
                      <p>
                        <span className="text-primarycstm ">
                          Click to upload
                        </span>
                        or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      id="upload"
                      name="upload"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <p>SVG, PNG, JPG</p>
                    <p className="text-gray-400">(max, 800x400px)</p>
                  </label>
                </div>
              </div>
              {(isEdit || image) && (
                <div className="mb-3 text-danger">
                  <div className="flex justify-between p-3 border rounded border-danger">
                    <div className="flex items-center gap-2">
                      <img src={Image} alt="icon Image" />
                      <p>Icon-Categroy.jpg</p>
                    </div>
                    <div>
                      <button>
                        <img src={DeleteIcon} alt="delete icon" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
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
              onClick={handleSaveOrUpdate}
              className="w-32 btn btn-danger"
              data-bs-dismiss="modal"
            >
              {isEdit ? "Save" : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModalComponent;
