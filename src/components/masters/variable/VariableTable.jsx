import React from "react";
import DisplayTable from "../../global/DisplayTable";

const VariableTable = () => {
  const tableHeader = [
    "Variable Name",
    "Variable Value",
    "Created At",
    "Status",
    "Actions",
  ];

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md"></div>
      </DisplayTable>
    </div>
  );
};

export default VariableTable;
