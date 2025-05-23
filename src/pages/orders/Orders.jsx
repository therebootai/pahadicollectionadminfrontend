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

  const orderId = searchParams.get("orderId");

  const handleOpenModal = (type, order) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", order.orderId);
    setSearchParams(params);
    setModalFor(type);
    setCurrentOrder(order);
    setShowAddOrder(true);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("order");
    setSearchParams(params);
    setModalFor("");
    setShowAddOrder(false);
    setCurrentOrder({});
  };

  const handleQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
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

    if (orderId) {
      query = { ...query, orderId };
    }
    fetchOrders(query);
  }, [currentPage, status, orderId]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <select
          className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
          value={status || ""}
          onChange={(e) => handleQueryParam("status", e.target.value)}
        >
          <option value="">Choose Status</option>
          <option value="ordered">Ordered</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out For Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancel_initiated">Cancel Initiated</option>
          <option value="canceled">Canceled</option>
          <option value="cancel_initiated_and_refund_generated">
            Cancel Initiated and Refund Generated
          </option>
          <option value="canceled_and_refunded">Canceled and Refunded</option>
          <option value="return_and_refunded">Return and Refunded</option>
        </select>
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Orders
        </button>
      </div>
      <div className="p-4 xlg:p-8 xl:p-8 flex flex-col gap-6">
        <OrdersTable
          orders={orders}
          fetchOrders={() => fetchOrders({ page: currentOrder, status })}
          handleOpenModal={handleOpenModal}
        />
        <PaginationBox pagination={pagination} prefix="/orders" />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={showAddOrder}>
        <div className="p-4">
          {modalFor === "edit-order" && (
            <EditOrders
              fetchOrders={() => fetchOrders({ page: currentOrder, status })}
              order={currentOrder}
            />
          )}
          {modalFor === "view-order" && <ViewOrder order={currentOrder} />}
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Orders;
