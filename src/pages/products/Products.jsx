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
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const type = searchParams.get("type");

  const fetchProducts = async (filter) => {
    let query = {
      page: currentPage,
    };

    if (filter) query = { ...filter, ...query };
    try {
      const response = await axiosFetch.get(`/products`, {
        params: query,
      });
      const { products, pagination } = response.data;
      setProducts(products);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCheckType = (type) => {
    const newParams = new URLSearchParams(searchParams);

    if (type === "") {
      newParams.delete("type");
    } else {
      newParams.set("type", type);
    }

    setSearchParams(newParams);
  };

  const handleClose = () => {
    setViewBox(false);
  };

  const handelView = () => {
    setViewBox(true);
  };

  useEffect(() => {
    let query = {};

    if (type) {
      query = { ...query, productType: type };
    }
    fetchProducts(query);
  }, [currentPage, type]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={type || ""}
          onChange={(e) => handleCheckType(e.target.value)}
        >
          <option value="">Choose Type</option>
          <option value="single">Single</option>
          <option value="variant">Variant</option>
        </select>
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
