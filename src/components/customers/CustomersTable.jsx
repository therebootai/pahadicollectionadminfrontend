import React from "react";
import DisplayTable from "../global/DisplayTable";

const CustomersTable = () => {
  const tableHeader = [
    "id",
    "Customer Name",
    "Sign Up Date",
    "Mobile No.",
    "Total Order Value",
    "Address",
    "Login Status",
    "Action",
  ];

  return <DisplayTable tableData={{ tableHeader }} />;
};

export default CustomersTable;
