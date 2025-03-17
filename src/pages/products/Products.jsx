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

  const status = searchParams.get("status");

  const tags = searchParams.get("tags");

  const is_drafted = searchParams.get("is_drafted");

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

  const handleQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "" || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
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

    if (status) {
      query = { ...query, isActive: status };
    }

    if (tags) {
      query = { ...query, tags: tags };
    }

    if (is_drafted) {
      query = { ...query, is_drafted: is_drafted };
    }

    fetchProducts(query);
  }, [currentPage, type, status, tags, is_drafted]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={type || ""}
          onChange={(e) => handleQueryParam("type", e.target.value)}
        >
          <option value="">Choose Type</option>
          <option value="single">Single</option>
          <option value="variant">Variant</option>
        </select>
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={status || ""}
          onChange={(e) => handleQueryParam("status", e.target.value)}
        >
          <option value="">Show All</option>
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={tags || ""}
          onChange={(e) => handleQueryParam("tags", e.target.value)}
        >
          <option value="">Show All Tags</option>
          <option value="best_selling">Best Selling</option>
          <option value="mostly_viewed">Mostly Viewed</option>
          <option value="mostly_added">Mostly Added</option>
          <option value="editor_choice">Editor Choice</option>
        </select>
        <div
          className={`h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium border border-custom-violet cursor-pointer ${
            Boolean(is_drafted)
              ? "bg-custom-violet text-white"
              : "bg-transparent text-custom-violet"
          }`}
        >
          <input
            type="checkbox"
            checked={Boolean(is_drafted)}
            onChange={(e) => handleQueryParam("is_drafted", e.target.checked)}
            className="sr-only"
            id="is_drafted"
          />
          <label htmlFor="is_drafted" className="cursor-pointer">
            Show Drafted Only
          </label>
        </div>
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
          fetchProducts={() =>
            fetchProducts({ page: currentPage, productType: type })
          }
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
