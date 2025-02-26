import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import AddNewComponent from "../../components/webcomponents/AddNewComponent";
import { useParams, useSearchParams } from "react-router-dom";
import ComponentTable from "../../components/webcomponents/ComponentTable";
import Loader from "../../components/global/Loader";
import axiosFetch from "../../config/axios.config";

const WebComponents = () => {
  const { type } = useParams();

  const [components, setComponents] = useState([]);
  const [pagination, setPagiantion] = useState({});
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const status = searchParams.get("status");

  const handleToggle = () => {
    const newParams = new URLSearchParams(searchParams);

    if (status === "true") {
      newParams.delete("status"); // Remove if already "active"
    } else {
      newParams.set("status", "true"); // Set to "active"
    }

    setSearchParams(newParams);
  };

  const fetchComponents = async (filter) => {
    let query = {};

    if (filter) query = { ...filter };
    try {
      setLoading(true);
      const response = await axiosFetch.get(`/component/get`, {
        params: query,
      });
      const { data, pagination } = response.data;
      setComponents(data);
      setPagiantion(pagination);
    } catch (error) {
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let query = {};

    if (status) {
      query = { ...query, status: true };
    }

    if (currentPage) {
      query = { ...query, page: currentPage };
    }

    if (type) query = { ...query, type };

    fetchComponents(query);
  }, [type, currentPage, status]);

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button
          className={`h-[3rem] px-8 flex justify-center items-center border rounded-md text-lg capitalize font-medium ${
            status === "true"
              ? "bg-custom-violet text-white border-transparent"
              : "bg-transparent border-custom-violet text-custom-violet"
          }`}
          onClick={handleToggle}
        >
          Show active only
        </button>
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Export
        </button>
      </div>
      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black capitalize">
          {type}
        </h1>
        <AddNewComponent
          pageType={type}
          fetchComponents={() =>
            fetchComponents({ type, page: currentPage, status })
          }
        />
        {loading ? (
          <Loader />
        ) : (
          <ComponentTable
            components={components}
            fetchComponents={() =>
              fetchComponents({
                type,
                page: currentPage,
                status,
              })
            }
            setComponents={setComponents}
          />
        )}
      </div>
      <div className="m-6">
        <PaginationBox pagination={pagination} prefix={`/components/${type}`} />
      </div>
    </MainPageTemplate>
  );
};

export default WebComponents;
