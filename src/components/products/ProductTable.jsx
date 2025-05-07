import React from "react";
import DisplayTable from "../global/DisplayTable";
import { Link } from "react-router-dom";
import axiosFetch from "../../config/axios.config";

const ProductTable = ({
  products,
  setProducts,
  setSelectedProduct,
  handelView,
}) => {
  const tableHeader = [
    "id",
    "Product Name",
    "Category Name",
    "Discount",
    "MRP",
    "Price",
    "In-Stock",
    "Status",
    "Action",
  ];

  const handleDeleteConfirm = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/products/${productId}`);

      setProducts(
        products.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handelToggleStatus = async (productId, status) => {
    try {
      const response = await axiosFetch.put(`/products/${productId}`, {
        isActive: !status,
      });
      const { data } = response.data;
      setProducts(
        products.map((product) =>
          product.productId === productId
            ? { ...product, isActive: !status }
            : product
        )
      );
    } catch (error) {
      console.error("Error update status product", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md">
          {products.length <= 0 ? (
            <div className="text-center text-2xl">No Data</div>
          ) : (
            products.map((product) => (
              <div
                className="flex flex-row p-2 py-4 border-b gap-2 border-custom-gray-border text-base"
                key={product.productId}
              >
                <div className="flex-1">{product.productId}</div>
                <div className="flex-1 line-clamp-2" title={product.title}>
                  {product.title}
                </div>
                <div className="flex-1">{product.category?.mainCategory}</div>

                <div className="flex-1">{product.discount} %</div>
                <div className="flex-1">{product.mrp}</div>
                <div className="flex-1">{product.price}</div>
                <div className="flex-1">{product.in_stock}</div>
                <div className="flex-1">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={product.isActive}
                      onChange={() =>
                        handelToggleStatus(product.productId, product.isActive)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex  items-center gap-3">
                    <button
                      onClick={() => {
                        handelView(product.productId);
                        setSelectedProduct(product);
                      }}
                      className="text-base font-medium text-custom-violet"
                    >
                      View
                    </button>
                    <Link
                      to={`/products/edit/${product.productId}`}
                      className="text-base font-medium text-custom-blue"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirm(product.productId)}
                      className="text-base font-medium text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DisplayTable>
    </div>
  );
};

export default ProductTable;
