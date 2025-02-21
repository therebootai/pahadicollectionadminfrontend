import React from "react";
import DisplayTable from "../../global/DisplayTable";
import axiosFetch from "../../../config/axios.config";

const CouponTable = ({
  coupons,
  setCoupons,
  fetchAllCoupons,
  handleAddCoupon,
}) => {
  const tableHeader = [
    "coupon name",
    "start date",
    "end date",
    "discount value",
    "minimum value",
    "status",
    "action",
  ];

  const handleDeleteConfirm = async (couponId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coupon?"
    );
    if (!confirmDelete) return;

    try {
      await axiosFetch.delete(`/coupons/${couponId}`);

      await fetchAllCoupons();
      alert("Coupon deleted successfully");
    } catch (error) {
      console.error("Error deleting coupon", error);
      alert("Failed to delete coupon. Please try again.");
    }
  };

  const handleToggle = async (couponId, isActive) => {
    try {
      const updatedPickup = { isActive: !isActive };
      await axiosFetch.put(`/coupons/${couponId}`, updatedPickup);

      setCoupons(
        coupons.map((coupon) =>
          couponId === coupon.couponId
            ? { ...coupon, isActive: !isActive }
            : coupon
        )
      );
    } catch (error) {
      console.error("Error updating coupon status", error);
      alert("Failed to update coupon status. Please try again.");
    }
  };

  return (
    <DisplayTable tableData={{ tableHeader }}>
      <div className="p-2 bg-white rounded-b-md">
        {coupons && coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="flex flex-row p-2 border-b border-custom-gray-border text-base"
            >
              <div className="flex-1">{coupon.couponName}</div>
              <div className="flex-1">
                {new Date(coupon.startDate).toDateString()}
              </div>
              <div className="flex-1">
                {new Date(coupon.endDate).toDateString()}
              </div>
              <div className="flex-1">{coupon.discount}%</div>
              <div className="flex-1">{coupon.minimumAmount}</div>
              <div className="flex-1">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={coupon.isActive}
                    onChange={() =>
                      handleToggle(coupon.couponId, coupon.isActive)
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex  items-center gap-3 flex-1">
                <button
                  className="text-base font-medium text-custom-violet"
                  onClick={() => handleAddCoupon("view-coupon", coupon)}
                >
                  View
                </button>
                <button
                  onClick={() => handleAddCoupon("edit-coupon", coupon)}
                  className="text-base font-medium text-custom-blue"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteConfirm(coupon._id)}
                  className="text-base font-medium text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl">No Data</div>
        )}
      </div>
    </DisplayTable>
  );
};

export default CouponTable;
