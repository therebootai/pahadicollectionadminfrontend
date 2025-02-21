import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddNewVariable from "../../components/masters/variable/AddNewVariable";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import VariableTable from "../../components/masters/variable/VariableTable";
import PaginationBox from "../../components/global/PaginationBox";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/global/Loader";
import axiosFetch from "../../config/axios.config";

const Variable = () => {
  const [showAddVariable, setShowAddVariable] = useState(false);
  const [variableData, setVariableData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const handleAddVariable = () => {
    setShowAddVariable(true);
  };

  const handleClose = () => {
    setShowAddVariable(false);
  };

  const fetchVariables = async () => {
    setLoading(true);
    try {
      const response = await axiosFetch.get(
        `/variables/get?page=${currentPage}&limit=20`
      );
      const { data, pagination } = response.data;
      setVariableData(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Error Fetching Variables", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, [currentPage]);

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
        {loading ? (
          <Loader />
        ) : (
          <VariableTable
            fetchVariables={fetchVariables}
            variableData={variableData}
            setVariableData={setVariableData}
          />
        )}
        <PaginationBox pagination={pagination} prefix="/masters/variable" />
      </div>
      <SidePopUpSlider handleClose={handleClose} showPopUp={showAddVariable}>
        <div className="p-4">
          <AddNewVariable fetchVariables={fetchVariables} />
        </div>
      </SidePopUpSlider>
    </MainPageTemplate>
  );
};

export default Variable;
