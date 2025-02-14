import React, { useState } from "react";
import AddCoupon from "../../components/marketing/coupon/AddCoupon";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import DisplayTable from "../../components/global/DisplayTable";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";

const AddAndManageCoupon = () => {
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const tableHeader = [
    "coupon name",
    "start date",
    "end date",
    "discount value",
    "minimum value",
    "status",
    "action",
  ];

  const handleAddCoupon = () => {
    setShowAddCoupon(true);
  };

  const handleClose = () => {
    setShowAddCoupon(false);
  };

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
          <button
            className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
            onClick={handleAddCoupon}
          >
            Add New Coupon
          </button>
        </div>
        <div className="p-4 flex flex-col gap-6">
          <div className="p-4 bg-white rounded-md border border-custom-lite-gray shadow-custom-lite">
            <div className="flex flex-col gap-8">
              <h1 className="text-xl font-medium text-custom-black">
                Coupon Manage
              </h1>

              <DisplayTable tableData={{ tableHeader }}>
                <div className="p-2 bg-white rounded-b-md"></div>
              </DisplayTable>
            </div>
          </div>
          <PaginationBox
            pagination={{ totalPages: 1, currentPage: 1 }}
            prefix="/marketing/add-manage-coupon"
          />
        </div>
        <SidePopUpSlider handleClose={handleClose} showPopUp={showAddCoupon}>
          <div className="p-4">
            <AddCoupon />
          </div>
        </SidePopUpSlider>
      </div>
    </MainPageTemplate>
  );
};

export default AddAndManageCoupon;
