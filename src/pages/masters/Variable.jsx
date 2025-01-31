import React, { useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddNewVariable from "../../components/masters/variable/AddNewVariable";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import VariableTable from "../../components/masters/variable/VariableTable";
import PaginationBox from "../../components/global/PaginationBox";

const Variable = () => {
  const [showAddVariable, setShowAddVariable] = useState(false);

  const handleAddVariable = () => {
    setShowAddVariable(true);
  };

  const handleClose = () => {
    setShowAddVariable(false);
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
        <VariableTable />
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
