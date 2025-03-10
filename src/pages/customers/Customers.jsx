import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import CustomersTable from "../../components/customers/CustomersTable";
import { useSearchParams } from "react-router-dom";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import ViewCustomers from "../../components/customers/ViewCustomers";
import EditCustomer from "../../components/customers/EditCustomer";
import axiosFetch from "../../config/axios.config";

const Customers = () => {
  const [searchParams] = useSearchParams();
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [modalFor, setModalFor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});

  const currentPage = searchParams.get("page") || 1;

  const fetchCustomers = async () => {
    try {
      const response = await axiosFetch.get(`/customers/?page=${currentPage}`);
      const { customers, pagination } = response.data;
      setCustomers(customers);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOpenModal = (type, customer) => {
    setModalFor(type);
    setCurrentCustomer(customer);
    setShowModal(true);
  };

  const handleClose = () => {
    setModalFor("");
    setShowModal(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Customers
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <CustomersTable
          customers={customers}
          handleOpenModal={handleOpenModal}
          fetchCustomers={fetchCustomers}
        />
        <PaginationBox pagination={pagination} prefix="/customers" />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={showModal}>
        <div className="p-4">
          {modalFor === "edit-customer" && (
            <EditCustomer
              fetchCustomers={fetchCustomers}
              customer={currentCustomer}
            />
          )}
          {modalFor === "view-customer" && (
            <ViewCustomers customer={currentCustomer} />
          )}
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Customers;
