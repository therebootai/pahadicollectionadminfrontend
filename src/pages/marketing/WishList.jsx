import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import { useSearchParams } from "react-router-dom";
import PaginationBox from "../../components/global/PaginationBox";
import axiosFetch from "../../config/axios.config";
import WishListsTable from "../../components/marketing/wishlists/WishListsTable";
import Loader from "../../components/global/Loader";

const WishList = () => {
  const [wishLists, setWishLists] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  async function fetchWishlists(filter) {
    let query = {
      page: currentPage,
    };

    if (filter) query = { ...filter, ...query };
    setLoading(true);
    try {
      const response = await axiosFetch.get(`/customers/wishlist`, {
        params: query,
      });
      const { wishlist, pagination } = response.data;
      setPagination(pagination);
      setWishLists(wishlist);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    let query = {
      page: currentPage || 1,
    };

    fetchWishlists(query);
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
      </div>
      <div className="p-4 flex flex-col gap-6 ">
        <div className=" flex flex-col gap-4 p-4 bg-custom-offwhite shadow-custom-lite rounded-md">
          <h1 className="text-xl font-medium text-custom-black">Wishlist</h1>
          {loading ? (
            <Loader />
          ) : (
            <WishListsTable
              wishLists={wishLists}
              fetchWishlists={fetchWishlists}
              loading={loading}
            />
          )}
        </div>
        <PaginationBox pagination={pagination} prefix="/wishlist" />
      </div>
    </MainPageTemplate>
  );
};

export default WishList;
