import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaymentTable from "../../components/payments/PaymentTable";
import { useSearchParams } from "react-router-dom";
import PaginationBox from "../../components/global/PaginationBox";
import axiosFetch from "../../config/axios.config";

const Payment = () => {
  const [pagination, setPagination] = useState({});
  const [payments, setPayments] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const status = searchParams.get("status");

  const handleCheckStatus = (status) => {
    const newParams = new URLSearchParams(searchParams);

    if (status === "") {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }

    setSearchParams(newParams);
  };

  const handleCheckMode = (mode) => {
    const newParams = new URLSearchParams(searchParams);

    if (mode === "") {
      newParams.delete("mode");
    } else {
      newParams.set("mode", mode);
    }

    setSearchParams(newParams);
  };

  async function fetchPayments(filter) {
    let query = {
      page: currentPage,
    };

    if (filter) query = { ...filter, ...query };

    try {
      const response = await axiosFetch.get(`/payments`, {
        params: query,
      });
      const { payments, pagination } = response.data;
      setPagination(pagination);
      setPayments(payments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let query = {};

    if (status) {
      query = { ...query, status };
    }
    fetchPayments(query);
  }, [currentPage, status]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={status || ""}
          onChange={(e) => handleCheckStatus(e.target.value)}
        >
          <option value="">Choose Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={status || ""}
          onChange={(e) => handleCheckMode(e.target.value)}
        >
          <option value="">Choose Payment Mode</option>
          <option value="COD">COD</option>
          <option value="ONLINE">Online</option>
        </select>
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Payments
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <PaymentTable payments={payments} />
        <PaginationBox pagination={pagination} prefix="/payments" />
      </div>
    </MainPageTemplate>
  );
};

export default Payment;
