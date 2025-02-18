import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import OrdersTable from "../../components/orders/OrdersTable";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import EditOrders from "../../components/orders/EditOrders";
import ViewOrder from "../../components/orders/ViewOrder";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [modalFor, setModalFor] = useState("");
  const [currentOrder, setCurrentOrder] = useState({});
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

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

  async function fetchOrders() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders/?page=${currentPage}`
      );
      const { orders, pagination } = response.data;
      setPagination(pagination);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
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
