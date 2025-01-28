import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import ProductTable from "../../components/products/ProductTable";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Product
        </button>
        <Link
          to="/products/add"
          className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
        >
          Add Products
        </Link>
      </div>
      <div>
        <ProductTable />
      </div>
    </MainPageTemplate>
  );
};

export default Products;
