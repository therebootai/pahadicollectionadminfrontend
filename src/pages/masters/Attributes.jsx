import React, { useEffect, useState } from "react";
import AttributeTable from "../../components/masters/attribute/AttributeTable";
import { useSearchParams } from "react-router-dom";
import PaginationBox from "../../components/global/PaginationBox";
import MainPageTemplate from "../../template/MainPageTemplate";
import axiosFetch from "../../config/axios.config";
import AddAttribute from "../../components/masters/attribute/AddAttribute";

const Attributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [pagination, setPagination] = useState({});

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const fetchAttributes = async (filter) => {
    let query = {
      ...filter,
    };
    try {
      const response = await axiosFetch.get(`/attributes`, {
        params: query,
      });
      const { attributes, pagination } = response.data;
      setAttributes(attributes);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    let query = {};

    if (currentPage) {
      query = { ...query, page: currentPage };
    }
    fetchAttributes(query);
  }, [currentPage]);

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
        <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
          <h1 className="text-2xl font-medium text-custom-black">
            Attributes Manage
          </h1>
          <AddAttribute fetchAttributes={fetchAttributes} />
          <AttributeTable
            attributes={attributes}
            setAttributes={setAttributes}
            fetchAttributes={fetchAttributes}
          />
          <PaginationBox pagination={pagination} prefix="/masters/attributes" />
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default Attributes;
