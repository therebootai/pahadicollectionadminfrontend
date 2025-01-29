import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddProductForm from "../../components/products/AddProductForm";

const AddProduct = () => {
  return (
    <MainPageTemplate>
      <div className="">
        <div className="py-4 px-8 bg-white flex flex-col gap-8 shadow-custom">
          <h1 className="text-xl font-medium text-custom-black">Add Product</h1>
          <AddProductForm />
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default AddProduct;
