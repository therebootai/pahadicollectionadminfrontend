import { useEffect, useState } from "react";
import AddCoupon from "../../components/marketing/coupon/AddCoupon";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import SidePopUpSlider from "../../components/global/SidePopUpSlider";
import { useSearchParams } from "react-router-dom";
import CouponTable from "../../components/marketing/coupon/CouponTable";
import ViewCoupon from "../../components/marketing/coupon/ViewCoupon";
import axiosFetch from "../../config/axios.config";
import Loader from "../../components/global/Loader";

const AddAndManageCoupon = () => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const couponId = searchParams.get("couponId");

  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [modalFor, setModalFor] = useState("add-coupon");
  const [currentCoupon, setCurrentCoupon] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAddCoupon = (type, coupon) => {
    if (type !== "add-coupon" && !coupon) {
      return;
    }
    if (type === "add-coupon") {
      setModalFor(type);
      setShowAddCoupon(true);
    } else {
      setModalFor(type);
      setCurrentCoupon(coupon);
      setShowAddCoupon(true);
    }
  };

  const handleClose = () => {
    setShowAddCoupon(false);
  };

  async function fetchAllCoupons(filter) {
    setLoading(true);
    try {
      let query = {};

      if (filter) query = { ...filter, ...query };
      const response = await axiosFetch.get(`/coupons`, {
        params: query,
      });
      const { coupons, pagination } = response.data;
      setCoupons(coupons);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let query = {
      page: currentPage || 1,
    };

    if (couponId) {
      query = { ...query, couponId };
    }

    fetchAllCoupons(query);
  }, [currentPage, couponId]);

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
          <button
            className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
            onClick={() => handleAddCoupon("add-coupon")}
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
              {loading ? (
                <Loader />
              ) : (
                <CouponTable
                  coupons={coupons}
                  setCoupons={setCoupons}
                  fetchAllCoupons={fetchAllCoupons}
                  handleAddCoupon={handleAddCoupon}
                />
              )}
            </div>
          </div>
          <PaginationBox
            pagination={pagination}
            prefix="/marketing/add-manage-coupon"
          />
        </div>
        <SidePopUpSlider handleClose={handleClose} showPopUp={showAddCoupon}>
          <div className="p-4">
            {modalFor === "add-coupon" && (
              <AddCoupon fetchAllCoupons={fetchAllCoupons} />
            )}
            {modalFor === "edit-coupon" && (
              <AddCoupon
                fetchAllCoupons={fetchAllCoupons}
                coupon={currentCoupon}
              />
            )}
            {modalFor === "view-coupon" && (
              <ViewCoupon coupon={currentCoupon} />
            )}
          </div>
        </SidePopUpSlider>
      </div>
    </MainPageTemplate>
  );
};

export default AddAndManageCoupon;
