import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import ProductTable from "../components/products/ProductTable";

const Products = () => {
  return (
    <MainPageTemplate>
      <ProductTable />
    </MainPageTemplate>
  );
};

export default Products;
