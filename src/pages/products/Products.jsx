import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import ProductTable from "../../components/products/ProductTable";
import { Link } from "react-router-dom";
import PaginationBox from "../../components/global/PaginationBox";

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
      <div className="p-4 flex flex-col gap-6">
        <ProductTable />
        <PaginationBox
          pagination={{ totalPages: 1, currentPage: 1 }}
          prefix="/products"
        />
      </div>
    </MainPageTemplate>
  );
};

export default Products;
