import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import ReviewTable from "../../components/marketing/reviews/ReviewTable";
import axiosFetch from "../../config/axios.config";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/global/Loader";

const Reviews = () => {
  const [pagination, setPagination] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  async function fetchReviews(filter) {
    let query = {};

    if (filter) query = { ...filter, ...query };
    setLoading(true);

    try {
      const response = await axiosFetch.get(`/reviews`, {
        params: query,
      });
      const { reviews, pagination } = response.data;
      setPagination(pagination);
      setReviews(reviews);
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
    let query = {};

    if (currentPage) query = { ...query, page: currentPage };
    fetchReviews(query);
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
      </div>

      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black">
          Reviews Manage
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <ReviewTable reviews={reviews} setReviews={setReviews} />
        )}
        <PaginationBox pagination={pagination} prefix="/reviews" />
      </div>
    </MainPageTemplate>
  );
};

export default Reviews;
