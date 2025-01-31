import React, { useEffect } from "react";
import DisplayTable from "../../global/DisplayTable";

const VariableTable = ({ variableData, setVariableData, fetchVariables }) => {
  const tableHeader = ["Variable Name", "Variable Value", "Status", "Actions"];

  useEffect(() => {
    fetchVariables();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md">
          {variableData && variableData.length > 0 ? (
            variableData.map((variable) => (
              <div
                className="flex flex-row p-2 border-b border-custom-gray-border text-base"
                key={variable.variableId}
              >
                <div className="flex-1 ">{variable.variableName}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {variable.variableType.map((item) => (
                      <div key={item._id}>{item.varType},</div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="switch">
                    <input type="checkbox" checked={variable.isActive} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex  items-center gap-3">
                    <button className="text-base font-medium text-custom-blue">
                      Edit
                    </button>
                    <button className="text-base font-medium text-red-500">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl">No Data</div>
          )}
        </div>
      </DisplayTable>
    </div>
  );
};

export default VariableTable;
