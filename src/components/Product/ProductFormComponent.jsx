import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Download from "../../assets/icons/product/Download.svg";
import Right from "../../assets/icons/rating/Right.svg";
import Plus from "../../assets/icons/product/Plus.svg";
import LeftForm from "../../assets/icons/product/LeftForm.svg";
import PlusElipse from "../../assets/icons/product/PlusElipse.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ItemProductComponent from "./ItemProductComponent";
import ProductModalComponent from "./ProductModalComponent";
import Swal from "sweetalert2";

const ProductFormComponent = ({
  isAdd,
  isEdit,
  isDetail,
  product,
  onAddProduct,
  onEditProduct,
}) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [varians, setVarians] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    stock: 0,
    price: 0,
    description: "",
  });

  // Initialize form data with product details if in edit or detail mode
  useEffect(() => {
    if (isEdit || isDetail) {
      setFormData({
        name: product.name,
        category: product.category,
        sku: product.sku,
        stock: product.stock,
        price: product.price,
        description: product.description,
      });
      setImages(product.image);
      setVarians(product.product_variant.map((v) => v.varian));
    }
  }, [isEdit, isDetail, product]);

  // Handle image selection and add it to the images array
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages([...images, ...selectedImages]);
  };

  // Remove the image at the specified index from the images array
  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // Update form data when input fields change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      image: images,
      product_variant: varians.map((varian) => ({ varian })),
    };

    if (isAdd) {
      onAddProduct(newProduct);
    } else if (isEdit) {
      onEditProduct({ ...newProduct, id: product.id });
    }

    Swal.fire({
      title: isEdit
        ? "This product was successfully updated"
        : "This product was successfully added",
      icon: "success",
      customClass: {
        title: "text-2xl font-bold",
      },
      showConfirmButton: false,
    });

    navigate("/product");
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/product");
  };

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
        <form className="row g-3" onSubmit={handleSubmit}>
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
              disabled={isDetail}
            >
              <option value="">Select a Category</option>
              <option value="Electronic">Electronic</option>
              <option value="Home & Lifestle">Home & Lifestle</option>
              <option value="Sports">Sports</option>
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
              value={formData.sku}
              onChange={handleChange}
              readOnly={isDetail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="varian" className="form-label">
              Product Varian
            </label>

            {varians.length > 0 ? (
              <div className="row">
                <div className="col-md-11">
                  <div className="row">
                    {varians.map((varian, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            placeholder="Enter Product Varian"
                            className="mb-2 bg-gray-100 form-control"
                            id="varian"
                            name="varian"
                            value={varian}
                            readOnly
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md">
                  {!isDetail && (
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#modalFormProduct"
                      disabled={isDetail}
                    >
                      <img src={PlusElipse} alt="add varian" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="form-control">
                {!isDetail && (
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalFormProduct"
                    className="gap-2 d-flex align-items-center text-primarycstm"
                  >
                    <img src={Plus} alt="Add Button" />
                    Add New Product Varian
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="stock" className="form-label">
              Initial Product Stock
            </label>
            <input
              type="number"
              placeholder="Enter Initial Product Stock"
              className="bg-gray-100 form-control"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              readOnly={isDetail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              className="bg-gray-100 form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              readOnly={isDetail}
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData({ ...formData, description: data });
              }}
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
                    "imageUpload",
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
            <div className="mt-4 col-md-12 col-lg-6">
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
                    onChange={handleImageChange}
                  />
                  <p>SVG, PNG, JPG</p>
                  <p className="text-gray-400">(max, 800x400px)</p>
                </label>
              </div>
            </div>
          )}

          {images && (
            <div className="mt-4 col-md-12">
              <div className="row">
                {images.map((image, index) => (
                  <div className="col-md-2" key={index}>
                    <ItemProductComponent
                      image={image}
                      onDelete={handleDeleteImage}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-row-reverse gap-3 col-12">
            {isDetail && (
              <button
                className="w-32 btn btn-secondary"
                type="button"
                onClick={handleCancel}
              >
                Back
              </button>
            )}

            {isEdit && (
              <>
                <button type="submit" className="w-32 btn btn-danger">
                  Save
                </button>
                <button
                  type="button"
                  className="w-32 btn btn-outline-danger"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}

            {!isEdit && !isDetail && (
              <>
                <button type="submit" className="w-32 btn btn-danger">
                  Add Product
                </button>
                <button
                  type="button"
                  className="w-32 btn btn-outline-danger"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <ProductModalComponent varians={varians} setVarians={setVarians} />
    </div>
  );
};

export default ProductFormComponent;
