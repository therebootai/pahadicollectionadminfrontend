import React, { useState } from "react";
import DisplayTable from "../../global/DisplayTable";
import SidePopUpSlider from "../../global/SidePopUpSlider";
import AddNewVariable from "./AddNewVariable";
import axiosFetch from "../../../config/axios.config";

const VariableTable = ({ variableData, setVariableData, fetchVariables }) => {
  const tableHeader = ["Variable Name", "Variable Value", "Status", "Actions"];
  const [showAddVariable, setShowAddVariable] = useState(false);
  const [variableToEdit, setVariableToEdit] = useState(null);

  const handleToggle = async (variableId, isActive) => {
    try {
      const updatedPickup = { isActive: !isActive };
      await axiosFetch.put(`/variables/update/${variableId}`, updatedPickup);

      setVariableData(
        variableData.map((variable) =>
          variable.variableId === variableId
            ? { ...variable, isActive: !variable.isActive }
            : variable
        )
      );
    } catch (error) {
      console.error("Error updating variable status", error);
      alert("Failed to update variable status. Please try again.");
    }
  };

  const handleDeleteConfirm = async (variableId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this variable?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/variables/delete/${variableId}`);

      setVariableData(
        variableData.filter((variable) => variable.variableId !== variableId)
      );
    } catch (error) {
      console.error("Error deleting variable", error);
      alert("Failed to delete variable. Please try again.");
    }
  };

  const handleClose = () => {
    setShowAddVariable(false);
  };

  const handleEdit = (variable) => {
    setVariableToEdit(variable);
    setShowAddVariable(true);
  };

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
                    <input
                      type="checkbox"
                      checked={variable.isActive}
                      onChange={() =>
                        handleToggle(variable.variableId, variable.isActive)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex  items-center gap-3">
                    <button
                      onClick={() => handleEdit(variable)}
                      className="text-base font-medium text-custom-blue"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(variable.variableId)}
                      className="text-base font-medium text-red-500"
                    >
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

      <SidePopUpSlider handleClose={handleClose} showPopUp={showAddVariable}>
        <div className="p-4">
          <AddNewVariable
            fetchVariables={fetchVariables}
            variableToEdit={variableToEdit}
          />
        </div>
      </SidePopUpSlider>
    </div>
  );
};

export default VariableTable;
