import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Download from "../../assets/icons/product/Download.svg";
import Right from "../../assets/icons/rating/Right.svg";
import Plus from "../../assets/icons/product/Plus.svg";
import LeftForm from "../../assets/icons/product/LeftForm.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ItemProductComponent from "./ItemProductComponent";
import ProductModalComponent from "./ProductModalComponent";

const ProductFormComponent = ({ isEdit, isDetail }) => {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="p-10 card">
        {/* Tittle Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-3">
              <img src={LeftForm} alt="left form icon" />
              <h2 className="font-lato font-bold text-[#030406] text-2xl">
                {isDetail
                  ? "Detail Product"
                  : isEdit
                  ? "Edit Product"
                  : "Add Product"}
              </h2>
            </div>

            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span>Product</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">
                {isDetail
                  ? "Detail Product"
                  : isEdit
                  ? "Edit Product"
                  : "Add Product"}
              </span>
            </div>
          </div>
        </div>
        <hr className="my-3 border-t border-gray-300" />
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="bg-gray-100 form-control"
              id="name"
              name="name"
              readOnly={isDetail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Product Category
            </label>
            <select
              className="bg-gray-100 form-select"
              id="category"
              name="category"
              disabled={isDetail}
            >
              <option value="">Select a Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="sku" className="form-label">
              SKU Product
            </label>
            <input
              type="text"
              placeholder="Enter SKU Product"
              className="bg-gray-100 form-control"
              id="sku"
              name="sku"
              readOnly={isDetail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="varian" className="form-label">
              Product Varian
            </label>
            <div className="form-control">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalFormCategory"
                className="gap-2 d-flex align-items-center text-primarycstm"
              >
                <img src={Plus} alt="Add Button" />
                Add New Product Varian
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="stock" className="form-label">
              Initial Product Stock
            </label>
            <input
              type="text"
              placeholder="Enter Initial Product Stock"
              className="bg-gray-100 form-control"
              id="stock"
              name="stock"
              readOnly={isDetail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              placeholder="Enter Price"
              className="bg-gray-100 form-control"
              id="price"
              name="price"
              readOnly={isDetail}
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                licenseKey: "GPL",
                toolbar: {
                  items: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "indent",
                    "outdent",
                    "|",
                    "imageUpload", // Menambahkan image upload
                  ],
                },
                placeholder: "Ketik deskripsi di sini...",
                language: "id",
                simpleUpload: {
                  uploadUrl: "/upload-image",
                },
              }}
            />
          </div>

          {isDetail !== true && (
            <div className="mt-4 col-md-6">
              <div className="p-4 bg-gray-100 card">
                <h5 className="mb-4">Product Photo</h5>
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center max-w-full py-3 text-base font-semibold text-gray-500 bg-gray-100 border-dashed rounded cursor-pointer border-3 border-primarycstm "
                >
                  <img src={Download} alt="upload image" />
                  <div className="flex">
                    <p>
                      <span className="text-primarycstm ">Click to upload</span>{" "}
                      or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    id="upload"
                    name="upload"
                    className="hidden"
                    readOnly={isDetail}
                  />
                  <p>SVG, PNG, JPG</p>
                  <p className="text-gray-400">(max, 800x400px)</p>
                </label>
              </div>
            </div>
          )}

          {isEdit && (
            <div className="mt-4 col-md-12">
              <div className="row">
                <div className="col-md">
                  <ItemProductComponent defaultItem={true} />
                </div>
                <div className="col-md">
                  <ItemProductComponent />
                </div>
                <div className="col-md">
                  <ItemProductComponent />
                </div>
                <div className="col-md">
                  <ItemProductComponent />
                </div>
                <div className="col-md">
                  <ItemProductComponent />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row-reverse gap-3 col-12">
            {isDetail && (
              <button className="w-32 btn btn-secondary">Back</button>
            )}

            {isEdit && (
              <>
                <button type="submit" className="w-32 btn btn-danger">
                  Save
                </button>
                <button className="w-32 btn btn-outline-danger">Cancel</button>
              </>
            )}

            {!isEdit && !isDetail && (
              <>
                <button type="submit" className="w-32 btn btn-danger">
                  Add Product
                </button>
                <button className="w-32 btn btn-outline-danger">Cancel</button>
              </>
            )}
          </div>
        </form>
      </div>
      <ProductModalComponent />
    </div>
  );
};

export default ProductFormComponent;
