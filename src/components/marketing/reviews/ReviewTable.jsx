import React from "react";
import DisplayTable from "../../global/DisplayTable";

const ReviewTable = () => {
  const tableHeader = [
    "Review Title",
    "Reviewed Product",
    "Created At",
    "Rating",
    "Product Name",
    "is active",
    "Action",
  ];

  return <DisplayTable tableData={{ tableHeader }}></DisplayTable>;
};

export default ReviewTable;
