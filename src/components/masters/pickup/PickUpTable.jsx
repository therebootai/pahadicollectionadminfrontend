import React from "react";
import DisplayTable from "../../global/DisplayTable";

const PickUpTable = () => {
  const tableHeader = ["Name", "Address Details", "Mobile Number", "Action"];
  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md"></div>
      </DisplayTable>
    </div>
  );
};

export default PickUpTable;
