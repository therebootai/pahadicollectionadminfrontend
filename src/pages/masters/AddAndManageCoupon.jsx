import React from "react";
import AddCoupon from "../../components/masters/coupon/AddCoupon";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import DisplayTable from "../../components/global/DisplayTable";

const AddAndManageCoupon = () => {
  const tableHeader = [
    "coupon name",
    "start date",
    "end date",
    "discount value",
    "minimum value",
    "status",
    "action",
  ];
  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
        <div className="p-4 flex flex-col gap-6">
          <div className="p-4 bg-white rounded-md border border-custom-lite-gray shadow-custom-lite">
            <div className="flex flex-col gap-8">
              <h1 className="text-xl font-medium text-custom-black">
                Coupon Manage
              </h1>
              <div className="">
                <AddCoupon />
              </div>

              <DisplayTable tableData={{ tableHeader }}>
                <div className="p-2 bg-white rounded-b-md"></div>
              </DisplayTable>
            </div>
          </div>
          <PaginationBox />
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default AddAndManageCoupon;
