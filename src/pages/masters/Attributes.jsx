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

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const status = searchParams.get("status");

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

    if (currentPage) {
      query = { ...query, page: currentPage };
    }

    if (status) {
      query = { ...query, is_active: status };
    }
    fetchAttributes(query);
  }, [currentPage, status]);

  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
          <select
            className="h-[3rem] px-8 flex justify-center items-center rounded-md text-lg font-medium text-custom-black border border-custom-violet focus-within:outline-none"
            value={status || ""}
            onChange={(e) => handleQueryParam("status", e.target.value)}
          >
            <option value="">Choose Status</option>
            <option value="true">Show Active Only</option>
            <option value="false">Show Disable Only</option>
          </select>
        </div>
        <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
          <h1 className="text-2xl font-medium text-custom-black">
            Attributes Manage
          </h1>
          <AddAttribute
            fetchAttributes={() =>
              fetchAttributes({ page: currentPage, is_active: status })
            }
          />
          <AttributeTable
            attributes={attributes}
            setAttributes={setAttributes}
            fetchAttributes={() =>
              fetchAttributes({ page: currentPage, is_active: status })
            }
          />
          <PaginationBox pagination={pagination} prefix="/masters/attributes" />
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default Attributes;
