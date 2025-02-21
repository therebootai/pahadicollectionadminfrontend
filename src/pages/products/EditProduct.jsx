import React, { useEffect, useState } from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import AddProductForm from "../../components/products/AddProductForm";
import { useParams } from "react-router-dom";
import axiosFetch from "../../config/axios.config";

const EditProduct = () => {
  const { id } = useParams();
  const [editedProduct, setEditedProduct] = useState({});

  async function fetchEditedProduct(id) {
    try {
      const response = await axiosFetch.get(`/products/${id}`);
      const { data } = response.data;
      setEditedProduct(data);
    } catch (error) {
      console.error("Error fetching edited product:", error);
    }
  }

  useEffect(() => {
    fetchEditedProduct(id);
  }, [id]);

  return (
    <MainPageTemplate>
      <div className="">
        <div className="py-4 px-8 bg-white flex flex-col gap-8 shadow-custom">
          <h1 className="text-xl font-medium text-custom-black">
            Edit Product
          </h1>
          <AddProductForm editedProduct={editedProduct} />
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default EditProduct;
