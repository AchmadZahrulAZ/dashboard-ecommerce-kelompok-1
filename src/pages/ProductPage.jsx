import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductFormComponent from "../components/Product/ProductFormComponent";
import ProductListComponent from "../components/Product/ProductListComponent";
import Swal from "sweetalert2";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      sku: "SKU-001",
      name: "Laptop Lenovo Y2",
      stock: 100,
      image: [
        {
          url_path:
            "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/115/MTA-179297638/lenovo_lenovo_ideapad_5_2-in-1_14irh9_11id_12id_--_intel_core_i7-13620h_16gb_512gb_ssd_intel_uhd_graphics_windows_11_home_ohs_14-wuxga_oled_touch_2y_adp_full06_kd7w0ok3.jpg",
        },
      ],
      product_variant: [
        {
          varian: "Merah",
        },
      ],
      description: "Laptop Lenovo Y2 Deskripsi",
      category: "Electronic",
      price: 900,
      published: true,
    },
    {
      id: "PRD-002",
      sku: "SKU-002",
      name: "Smartphone Samsung Galaxy S21",
      stock: 50,
      image: [
        {
          url_path:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9fU7Hh_xaTdMPLaLFBnDojOrmxY5sCfFXMg&s",
        },
      ],
      product_variant: [
        {
          varian: "Hitam",
        },
        {
          varian: "Putih",
        },
      ],
      description: "Smartphone Samsung Galaxy S21 Deskripsi",
      category: "Electronic",
      price: 1200,
      published: true,
    },
    {
      id: "PRD-003",
      sku: "SKU-003",
      name: "Tablet Apple iPad Air",
      stock: 75,
      image: [
        {
          url_path:
            "https://p-id.ipricegroup.com/uploaded_c9910c119465956dc5b3564f834b164fdfbb8c98.jpg",
        },
      ],
      product_variant: [
        {
          varian: "Space Gray",
        },
        {
          varian: "Silver",
        },
        {
          varian: "Rose Gold",
        },
      ],
      description: "Tablet Apple iPad Air Deskripsi",
      category: "Electronic",
      price: 700,
      published: false,
    },
    {
      id: "PRD-004",
      sku: "SKU-004",
      name: "Headphone Sony WH-1000XM4",
      stock: 30,
      image: [
        {
          url_path:
            "https://bgr.com/wp-content/uploads/2021/07/sony-wh-1000xm4-review-1.jpg?quality=82&strip=all&resize=1400,1400",
        },
      ],
      product_variant: [
        {
          varian: "Hitam",
        },
      ],
      description: "Headphone Sony WH-1000XM4 Deskripsi",
      category: "Electronic",
      price: 350,
      published: true,
    },
    {
      id: "PRD-005",
      sku: "SKU-005",
      name: "Smartwatch Garmin Venu 2",
      stock: 60,
      image: [
        {
          url_path:
            "https://pict.sindonews.net/webp/480/pena/news/2022/02/22/123/693729/review-smartwatch-garmin-venu-2-plus-rp74-jutaan-bisa-apa-saja-hel.webp",
        },
      ],
      product_variant: [
        {
          varian: "Granite Blue",
        },
        {
          varian: "Black",
        },
      ],
      description: "Smartwatch Garmin Venu 2 Deskripsi",
      category: "Electronic",
      price: 400,
      published: true,
    },
  ]);

  const [productSelected, setProductSelected] = useState(null);

  // Function to generate a unique ID for new products with the prefix "PRD-"
  const generateUniqueId = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `PRD-${randomNumber}`;
  };

  // Function to handle adding a new product
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: generateUniqueId() }]);
    navigate("/product");
  };

  // Function to handle editing an existing product
  const handleEditProduct = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    navigate("/product");
  };

  // Function to handle switch change for publishing/unpublishing a product
  const handleSwitchChange = (productId, newPublishedValue) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, published: newPublishedValue }
          : product
      )
    );

    if (!newPublishedValue) {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure want to unpublish this category? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        customClass: {
          title: "my-title-class",
          cancelButton: "swal2-cancel-outline",
          confirmButton: "swal2-confirm-no-outline",
        },
      }).then((result) => {
        if (!result.isConfirmed) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? { ...product, published: true }
                : product
            )
          );
        }
      });
    }
  };

  // Function to handle deleting a product using SweetAlert2 for confirmation
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Delete Product?",
      text: "Are you sure want to delete this poduct?",
      icon: "warning",
      iconHtml: `<i class="bi bi-trash"></i>`,
      customClass: {
        title: "my-title-class",
        cancelButton: "swal2-cancel-outline",
        confirmButton: "swal2-confirm-no-outline",
      },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        Swal.fire({
          title: "This product was successfully deleted",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      {!isAdd && !isEdit && !isDetail && (
        <ProductListComponent
          products={products}
          onSelectProduct={setProductSelected}
          onDeleteProduct={handleDeleteProduct}
          onSwitchChange={handleSwitchChange}
        />
      )}

      {(isAdd || isEdit || isDetail) && (
        <ProductFormComponent
          isAdd={isAdd}
          isEdit={isEdit}
          isDetail={isDetail}
          product={productSelected}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
        />
      )}
    </>
  );
};

export default ProductPage;
