import React from "react";

const DisplayTable = ({ children, tableData }) => {
  const { tableHeader } = tableData;
  return (
    <div>
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite">
        <div className="flex flex-row p-2 py-4 gap-2 rounded-t-md text-base font-medium bg-custom-lite-gray">
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
        <div className=" h-96 overflow-hidden overflow-y-scroll bg-custom-offwhite">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DisplayTable;
