import React from "react";

const DisplayTable = ({ children, tableData }) => {
  const { tableHeader } = tableData;
  return (
    <div>
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite">
        <div className="flex flex-row p-2 bg-custom-offwhite rounded-t-md text-base font-medium">
          {tableHeader.map((item, index) => (
            <div
              key={index}
              className={`capitalize flex-1`}
              style={{ flexBasis: `${Math.round(100 / tableHeader.length)}%` }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className=" h-96 overflow-hidden overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DisplayTable;
