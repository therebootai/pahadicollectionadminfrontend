import React from "react";
import DisplayTable from "../../global/DisplayTable";

const WishListsTable = ({ wishLists,loading }) => {
  const tableHeader = ["Customer Name", "Mobile No.", "Product", "Action"];
  return <DisplayTable tableData={{ tableHeader }}></DisplayTable>;
};

export default WishListsTable;
