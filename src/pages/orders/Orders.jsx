import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import OrdersTable from "../../components/orders/OrdersTable";
import { useSearchParams } from "react-router-dom";
import EditOrders from "../../components/orders/EditOrders";
import ViewOrder from "../../components/orders/ViewOrder";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import axiosFetch from "../../config/axios.config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [modalFor, setModalFor] = useState("");
  const [currentOrder, setCurrentOrder] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const status = searchParams.get("status");

  const handleOpenModal = (type, coupon) => {
    setModalFor(type);
    setCurrentOrder(coupon);
    setShowAddOrder(true);
  };

  const handleClose = () => {
    setModalFor("");
    setShowAddOrder(false);
    setCurrentOrder({});
  };

  const handleCheckStatus = (status) => {
    const newParams = new URLSearchParams(searchParams);

    if (status === "") {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }

    setSearchParams(newParams);
  };

  async function fetchOrders(filter) {
    let query = {};

    if (filter) query = { ...filter, ...query };
    try {
      const response = await axiosFetch.get(`/orders`, {
        params: query,
      });
      const { orders, pagination } = response.data;
      setPagination(pagination);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let query = {
      page: currentPage || 1,
    };

    if (status) {
      query = { ...query, status };
    }
    fetchOrders(query);
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
          <option value="ordered">Ordered</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out For Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="refund_generated">Refund Generated</option>
          <option value="refunded">Refunded</option>
        </select>
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Orders
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <OrdersTable
          orders={orders}
          fetchOrders={fetchOrders}
          handleOpenModal={handleOpenModal}
        />
        <PaginationBox pagination={pagination} prefix="/orders" />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={showAddOrder}>
        <div className="p-4">
          {modalFor === "edit-order" && (
            <EditOrders fetchOrders={fetchOrders} order={currentOrder} />
          )}
          {modalFor === "view-order" && <ViewOrder order={currentOrder} />}
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Orders;
