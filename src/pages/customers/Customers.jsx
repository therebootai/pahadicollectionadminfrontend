import React, { useEffect } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import CustomersTable from "../../components/customers/CustomersTable";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Customers = () => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customers/?page=${currentPage}`
      );
      const { customers, pagination } = response.data;
      //   setProducts(products);
      //   setPagination(pagination);
      console.log(customers);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Customers
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <CustomersTable />
        <PaginationBox
          pagination={{ totalPages: 1, currentPage: 1 }}
          prefix="/customers"
        />
      </div>
    </MainPageTemplate>
  );
};

export default Customers;
