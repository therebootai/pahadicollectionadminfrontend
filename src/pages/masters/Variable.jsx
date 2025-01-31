import React, { useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddNewVariable from "../../components/masters/variable/AddNewVariable";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import VariableTable from "../../components/masters/variable/VariableTable";
import PaginationBox from "../../components/global/PaginationBox";
import axios from "axios";

const Variable = () => {
  const [showAddVariable, setShowAddVariable] = useState(false);
  const [variableData, setVariableData] = useState([]);

  const handleAddVariable = () => {
    setShowAddVariable(true);
  };

  const handleClose = () => {
    setShowAddVariable(false);
  };

  const fetchVariables = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/variables/get`
      );
      setVariableData(response.data.variabledata);
    } catch (error) {
      console.error("Error Fatching Variables", error);
    }
  };

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button
          className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
          onClick={handleAddVariable}
        >
          Add New Variable
        </button>
      </div>
      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black">Variable</h1>
        <VariableTable
          fetchVariables={fetchVariables}
          variableData={variableData}
          setVariableData={setVariableData}
        />
        <PaginationBox />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={showAddVariable}>
        <div className="p-4">
          <AddNewVariable />
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Variable;
