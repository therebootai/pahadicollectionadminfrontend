import React from "react";
import DisplayTable from "../global/DisplayTable";

const OrdersTable = () => {
  const tableHeader = [
    "id",
    "Date & Time",
    "Customer Name",
    "Mobile No.",
    "Shipping Address",
    "Order Value",
    "Payment Method",
    "Order Status",
    "Action",
  ];

  return <DisplayTable tableData={{ tableHeader }} />;
};

export default OrdersTable;
