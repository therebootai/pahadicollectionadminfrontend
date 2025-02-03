import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaginationBox from "../../components/global/PaginationBox";
import AddNewComponent from "../../components/webcomponents/AddNewComponent";
import { useParams, useSearchParams } from "react-router-dom";
import ComponentTable from "../../components/webcomponents/ComponentTable";
import axios from "axios";

const WebComponents = () => {
  const { type } = useParams();

  const [components, setComponents] = useState([]);
  const [pagination, setPagiantion] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/component/get?type=${type}&page=${currentPage}`
      );
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
    fetchComponents();
  }, [type, currentPage]);

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
        <AddNewComponent pageType={type} fetchComponents={fetchComponents} />
        {loading ? (
          <p className="text-center text-2xl font-bold">Loading...</p>
        ) : (
          <ComponentTable
            components={components}
            fetchComponents={fetchComponents}
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
