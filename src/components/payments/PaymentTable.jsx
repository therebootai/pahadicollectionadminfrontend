import React from "react";
import DisplayTable from "../global/DisplayTable";

const PaymentTable = () => {
  const tableHeader = [
    "id",
    "Customer Name",
    "Payment Date",
    "Payment Mode",
    "Amount",
    "Status",
    "Order id",
    "Action",
  ];
  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md"></div>
      </DisplayTable>
    </div>
  );
};

export default PaymentTable;
