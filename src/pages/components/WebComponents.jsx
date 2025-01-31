import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import AddNewComponent from "../../components/webcomponents/AddNewComponent";
import { useParams } from "react-router-dom";

const WebComponents = () => {
  const { type } = useParams();

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Export
        </button>
      </div>
      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black capitalize">
          {type}
        </h1>
        <AddNewComponent pageType={type} />
        
      </div>
      <div className="m-6">
        <PaginationBox />
      </div>
    </MainPageTemplate>
  );
};

export default WebComponents;
