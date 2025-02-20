import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import ProductTable from "../../components/products/ProductTable";
import { Link, useSearchParams } from "react-router-dom";
import PaginationBox from "../../components/global/PaginationBox";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import ViewProduct from "../../components/products/ViewProduct";
import axiosFetch from "../../config/axios.config";

const Products = () => {
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [viewBox, setViewBox] = useState(false);
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const fetchProducts = async () => {
    try {
      const response = await axiosFetch.get(`/products/?page=${currentPage}`);
      const { products, pagination } = response.data;
      setProducts(products);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClose = () => {
    setViewBox(false);
  };

  const handelView = () => {
    setViewBox(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

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
        <ProductTable
          products={products}
          setProducts={setProducts}
          fetchProducts={fetchProducts}
          setSelectedProduct={setSelectedProduct}
          handelView={handelView}
        />
        <PaginationBox pagination={pagination} prefix="/products" />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={viewBox}>
        <div className="p-4">
          <ViewProduct product={selectedProduct} />
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Products;
