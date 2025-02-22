import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../../config/axios.config";

const AddProductForm = ({ editedProduct }) => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productImageThumb, setProductImageThumb] = useState([]);
  const [hoverImageThumb, setHoverImageThumb] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [productType, setProductType] = useState("single");
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [allPickUps, setAllPickUps] = useState([]);
  const [pickup, setPickup] = useState("");
  const [allVariables, setALLVariables] = useState([]);
  const [discount, setDiscount] = useState("");
  const [inStock, setInStock] = useState("");
  const [mrp, setMrp] = useState("");
  const [prize, setPrize] = useState("");
  const [attribute, setAttribute] = useState("");
  const [productSpecification, setProductSpecification] = useState([
    { key: "", value: "" },
  ]);
  const [description, setDescription] = useState("");
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [allMainProducts, setAllMainProducts] = useState([]);
  const [mainProduct, setMainProduct] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [selectedVariantValue, setSelectedVariantValue] = useState("");
  const [allAttributes, setAllAttributes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (editedProduct) {
      setProductName(editedProduct.title || "");
      if (editedProduct.productImage) {
        if (Array.isArray(editedProduct.productImage)) {
          setProductImage(
            editedProduct.productImage.map((img) => ({
              secure_url: img.secure_url,
              public_id: img.public_id,
            }))
          );
          setProductImageThumb(
            editedProduct.productImage.map((img) => img.secure_url)
          );
        } else if (
          typeof editedProduct.productImage === "object" &&
          editedProduct.productImage !== null
        ) {
          // Handle the case where editedProduct.productImage is a single image object
          setProductImage([
            {
              secure_url: editedProduct.productImage.secure_url,
              public_id: editedProduct.productImage.public_id,
            },
          ]);
          setProductImageThumb([editedProduct.productImage.secure_url]);
        } else {
          setProductImage([]);
          setProductImageThumb([]);
        }
      } else {
        setProductImage([]);
        setProductImageThumb([]);
      }
      setProductImageThumb(
        editedProduct.productImage?.map((img) => img.secure_url) || []
      );
      setHoverImageThumb(editedProduct.hoverImage?.secure_url || null);
      setHoverImage(editedProduct.hoverImage || null);
      setProductType(editedProduct.productType || "single");
      setCategory(editedProduct.category?._id || "");
      setSelectedMainCategory(editedProduct.category || null);
      const selectedSubCategoryObj = editedProduct.category?.subcategories.find(
        (sub) => sub.subcategoriesname === editedProduct.subCategory
      );
      if (editedProduct.productType === "variant") {
        setMainProduct({
          _id: editedProduct.main_product?._id,
          title: editedProduct.main_product?.title,
        });
        setSelectedVariable(editedProduct.variable?.variableId);
        setSelectedVariantValue(editedProduct.variable?.variableValue);
      }
      setSubCategory(editedProduct.subCategory || "");
      setSelectedSubCategory(selectedSubCategoryObj || null);
      setSubSubCategory(editedProduct.subSubCategory || "");
      setSelectedSubSubCategory(editedProduct.subSubCategory || null);
      setPickup(editedProduct.pickup?._id || "");
      setDiscount(editedProduct.discount || "");
      setInStock(editedProduct.in_stock || "");
      setMrp(editedProduct.mrp || "");
      setPrize(editedProduct.price || "");
      setAttribute(editedProduct.attribute || "");
      setProductSpecification(
        editedProduct.specification?.map((spec) => ({
          key: spec.key,
          value: spec.value,
        })) || [{ key: "", value: "" }]
      );
      setDescription(editedProduct.description || "");
      setThumbnailIndex(
        editedProduct.productImage?.findIndex(
          (image) => image.public_id === editedProduct.thumbnail_image.public_id
        )
      );
    }
  }, [editedProduct]);

  const fetchCategories = async () => {
    try {
      const response = await axiosFetch.get(`/category/get`);
      const { categories } = response.data;

      // Extract all categories
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMainProducts = async (query) => {
    if (!query.trim()) return setAllMainProducts([]);
    try {
      const response = await axiosFetch.get(
        `/products/find?limit=1000&page=1&search=${query}`
      );
      const { data } = response.data;
      setAllMainProducts(data);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchPickups = async () => {
    try {
      const response = await axiosFetch.get(`/pickups/get`);
      setAllPickUps(response.data.pickupdata);
    } catch (error) {
      console.error("Error fetching Pickup Data:", error);
    }
  };

  const fetchVariables = async () => {
    try {
      const response = await axiosFetch.get(`/variables/get?&limit=200`);
      const { data } = response.data;
      setALLVariables(data);
    } catch (error) {
      console.error("Error Fetching Variables", error);
    }
  };

  const fetchAllAttributes = async () => {
    try {
      const response = await axiosFetch.get(`/attributes?is_active=true`);
      const { attributes } = response.data;
      setAllAttributes(attributes);
    } catch (error) {
      console.error("Error Fetching Attributes", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        fetchCategories(),
        fetchPickups(),
        fetchVariables(),
        fetchAllAttributes(),
      ]);
    }
    fetchData();
  }, []);

  const handleFileChange = (event, setThumb, setUpload) => {
    const file = event.target.files[0];

    if (file) {
      setThumb(URL.createObjectURL(file)); // Create a URL for the selected file
      setUpload(file);
    }
  };

  const handleProductImageChange = (event, setThumbs, setUploads) => {
    const files = Array.from(event.target.files); // Convert FileList to array

    if (files.length > 0) {
      const fileURLs = files.map((file) => URL.createObjectURL(file)); // Create URLs for preview
      setThumbs((prevThumbs) => [...prevThumbs, ...fileURLs]); // Add new thumbnails
      setUploads((prevUploads) => [...prevUploads, ...files]); // Add new files
    }
  };

  const handleRemoveProductImage = (index) => {
    setProductImageThumb((prevThumbs) =>
      prevThumbs.filter((_, i) => i !== index)
    );
    setProductImage((prevUploads) => prevUploads.filter((_, i) => i !== index));
  };

  const handleAddValue = () => {
    setProductSpecification([...productSpecification, { key: "", value: "" }]);
  };

  const handleRemoveValue = (index) => {
    setProductSpecification(productSpecification.filter((_, i) => i !== index));
  };

  const handleChangeValue = (index, newValue) => {
    setProductSpecification(
      productSpecification.map((val, i) => (i === index ? newValue : val))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", productName);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("subSubCategory", subSubCategory);
    formData.append("pickup", pickup);
    formData.append("productType", productType);
    formData.append("price", prize);
    formData.append("mrp", mrp);
    formData.append("in_stock", inStock);
    formData.append("attribute", attribute);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("specification", JSON.stringify(productSpecification));
    productImage.forEach((image) => {
      formData.append(`productImage`, image); // Append each file separately
    });
    formData.append("hoverImage", hoverImage);
    formData.append("thumbnailIndex", thumbnailIndex);
    if (productType === "variant") {
      formData.append("main_product", mainProduct._id);
      formData.append(
        "variable",
        JSON.stringify({
          variableId: selectedVariable._id,
          variableValue: selectedVariantValue,
        })
      );
    }

    try {
      const response = await axiosFetch.post(`/products/create`, formData);
      const result = response.data;
      if (!result) {
        alert("Failed to add product. Please try again.");
        return;
      }
      alert("Product added successfully!");
      navigate("/products?page=1");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleUpdate = async (e, productId) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", productName);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("subSubCategory", subSubCategory);
    formData.append("pickup", pickup);
    formData.append("productType", productType);
    formData.append("price", prize);
    formData.append("mrp", mrp);
    formData.append("in_stock", inStock);
    formData.append("attribute", attribute);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("specification", JSON.stringify(productSpecification));
    const existingImagesToSend = productImage
      .filter((image) => typeof image === "object" && image.secure_url)
      .map((img) => ({ secure_url: img.secure_url, public_id: img.public_id })); // Prepare existing image data

    productImage.forEach((image) => {
      // Send ALL images (new and existing)
      if (typeof image === "object" && image instanceof File) {
        formData.append(`productImage`, image);
      }
    });

    formData.append("productImage", JSON.stringify(existingImagesToSend));

    if (productType === "variant") {
      formData.append("main_product", mainProduct._id);
      formData.append(
        "variable",
        JSON.stringify({
          variableId: selectedVariable._id,
          variableValue: selectedVariantValue,
        })
      );
    }
    formData.append("hoverImage", hoverImage);
    formData.append("thumbnailIndex", thumbnailIndex);

    try {
      const response = await axiosFetch.put(`/products/${productId}`, formData);
      const result = response.data;
      if (!result) {
        alert("Failed to update product. Please try again.");
        return;
      }
      alert("Product updated successfully!");
      navigate("/products?page=1");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const subCategories = selectedMainCategory?.subcategories || [];

  const subSubCategories = selectedSubCategory?.subsubcategories || [];

  const handleProductSearchChange = (e) => {
    const value = e.target.value;
    fetchMainProducts(value);
  };

  const handleVariableChange = (e) => {
    const variableId = e.target.value;
    const variable = allVariables.find((item) => item._id === variableId);

    setSelectedVariable(variable);
    setSelectedVariantValue("");
  };
  const handleValueChange = (value) => {
    setSelectedVariantValue(value);
  };

  return (
    <form className="flex flex-col gap-12">
      <div className="grid grid-cols-3 gap-8">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter Product Title"
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            const mainCat = allCategories.find(
              (cat) => cat._id === e.target.value
            );
            setSelectedMainCategory(mainCat);
            setSelectedSubCategory(null);
            setSelectedSubSubCategory(null);
          }}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Category</option>
          {allCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.mainCategory}
            </option>
          ))}
        </select>
        <select
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
          value={subCategory}
          onChange={(e) => {
            setSubCategory(e.target.value);
            const subCat = subCategories.find(
              (sub) => sub.subcategoriesname === e.target.value
            );
            setSelectedSubCategory(subCat);
            setSelectedSubSubCategory(null);
          }}
          disabled={!selectedMainCategory}
        >
          <option value="">Choose Sub Category</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory.subcategoriesname}>
              {subCategory.subcategoriesname}
            </option>
          ))}
        </select>
        <select
          value={subSubCategory}
          onChange={(e) => {
            setSubSubCategory(e.target.value);
            const subSubCat = subSubCategories.find(
              (subSub) => subSub.subsubcategoriesname === e.target.value
            );
            setSelectedSubSubCategory(subSubCat);
          }}
          disabled={!selectedSubCategory}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Sub-Sub Category</option>
          {subSubCategories.map((subSubCategory) => (
            <option
              key={subSubCategory._id}
              value={subSubCategory.subsubcategoriesname}
            >
              {subSubCategory.subsubcategoriesname}
            </option>
          ))}
        </select>
        <select
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Pickup Location</option>
          {allPickUps.map((pickup) => (
            <option key={pickup._id} value={pickup._id}>
              {pickup.pickupPointName}
            </option>
          ))}
        </select>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        >
          <option value="">Choose Product Type</option>
          <option value="single">Single</option>
          <option value="variant">Variable</option>
        </select>
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
            let currentPrice =
              parseInt(mrp) - parseInt(mrp) * (parseInt(e.target.value) / 100);
            setPrize(currentPrice || "");
          }}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        />
        {productType === "variant" && (
          <div className="flex flex-col gap-2 relative">
            <input
              type="text"
              value={mainProduct.title}
              className="h-[3rem] px-2 border border-custom-gray-border outline-none placeholder:text-custom-gray text-custom-black rounded-md"
              onChange={handleProductSearchChange}
              placeholder="Search and select product"
            />
            {dropdownVisible && allMainProducts.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto w-full top-full">
                {allMainProducts.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => {
                      setMainProduct({
                        _id: product._id,
                        title: product.title,
                      });
                      setCategory(product.category?._id || "");
                      setSelectedMainCategory(product.category || null);
                      const selectedSubCategoryObj =
                        product.category?.subcategories.find(
                          (sub) => sub.subcategoriesname === product.subCategory
                        );
                      setSubCategory(product.subCategory || "");
                      setSelectedSubCategory(selectedSubCategoryObj || null);
                      setSubSubCategory(product.subSubCategory || "");
                      setSelectedSubSubCategory(product.subSubCategory || null);
                      setPickup(product.pickup?._id || "");
                      setDiscount(product.discount || "");
                      setInStock(product.in_stock || "");
                      setMrp(product.mrp || "");
                      setPrize(product.price || "");
                      setAttribute(product.attribute || "");
                      setProductSpecification(
                        product.specification?.map((spec) => ({
                          key: spec.key,
                          value: spec.value,
                        })) || [{ key: "", value: "" }]
                      );
                      setDescription(product.description || "");
                      setDropdownVisible(false);
                      setSelectedVariable(product.variable?.variableId);
                      setSelectedVariantValue(product.variable?.variableValue);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-custom-black">
          Other Details &#40;Product Types&#41;
        </h2>
        <div className="flex flex-wrap gap-8 w-full">
          {productType === "variant" && (
            <div className="relative flex flex-1 justify-between gap-4">
              <select
                value={selectedVariable?._id || ""}
                onChange={handleVariableChange}
                className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
              >
                <option value="">Variable</option>
                {allVariables.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.variableName}
                  </option>
                ))}
              </select>

              {/* Display variable type options if a variable is selected */}
              {selectedVariable?.variableType && (
                <div className="flex flex-col gap-2 mt-2">
                  {selectedVariable.variableType.map((item) => (
                    <div key={item._id} className="flex gap-2">
                      <input
                        type="radio"
                        name={`variableType-${selectedVariable._id}}`}
                        id={item._id}
                        value={item.varType}
                        checked={selectedVariantValue === item.varType}
                        onChange={() => handleValueChange(item.varType)}
                      />
                      <label
                        htmlFor={item._id}
                        className="text-base font-medium text-custom-black"
                      >
                        {item.varType}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <input
            type="number"
            placeholder="In-Stock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
          />
          <input
            type="number"
            placeholder="MRP"
            value={mrp}
            onChange={(e) => {
              setMrp(e.target.value);
              let currentPrice =
                parseInt(e.target.value) -
                parseInt(e.target.value) * (parseInt(discount) / 100);
              setPrize(currentPrice || "");
            }}
            className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={prize}
            disabled
            className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-custom-black">
          Product Attributes
        </h2>
        <div className="flex flex-wrap gap-4">
          {allAttributes.length > 0 &&
            allAttributes.map((attribute) => (
              <input
                type="text"
                key={attribute._id}
                value={attribute.attribute_title}
                onChange={(e) => setAttribute(e.target.value)}
                placeholder="Enter Attribute"
                className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md flex-1"
              />
            ))}
        </div>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="p-2 border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
        placeholder="Write Description"
      ></textarea>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium text-custom-black">
          Main Specifications
        </h3>
        <div className="flex flex-col gap-4">
          {productSpecification.map((value, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <input
                type="text"
                value={value.key}
                onChange={(e) =>
                  handleChangeValue(index, { ...value, key: e.target.value })
                }
                placeholder="Type"
                className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
              />
              <input
                type="text"
                placeholder="Value"
                value={value.value}
                onChange={(e) =>
                  handleChangeValue(index, { ...value, value: e.target.value })
                }
                className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md"
              />
              <button
                type="button"
                onClick={handleAddValue}
                className="bg-custom-lite-gray border border-custom-gray-border text-custom-black h-12 rounded-md"
              >
                Add Specification
              </button>

              {productSpecification.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveValue(index)}
                  className="bg-custom-lite-gray border border-custom-gray-border text-custom-black h-12 rounded-md"
                >
                  Remove Specification
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-8 flex-1">
          <div className="relative w-full h-[3rem] border border-custom-gray-border rounded-md">
            <label
              htmlFor="file-input"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
            >
              Choose Product Images...
            </label>
            <input
              id="file-input"
              multiple
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) =>
                handleProductImageChange(
                  e,
                  setProductImageThumb,
                  setProductImage
                )
              }
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {productImageThumb.length === 0 && (
              <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray" />
            )}
            {productImageThumb.map((image, index) => (
              <div className="relative" key={index}>
                {image ? (
                  <div
                    className="relative cursor-pointer"
                    title="Set Thumbnail"
                    onClick={() => setThumbnailIndex(index)}
                  >
                    <img
                      src={image}
                      alt="Selected Thumbnail"
                      className="w-full h-[8rem] object-cover rounded-md"
                    />
                    {thumbnailIndex === index && (
                      <div className="absolute top-0 left-0 w-full h-full border-8 border-custom-gray/60" />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray" />
                )}

                <button
                  type="button"
                  onClick={() => handleRemoveProductImage(index)}
                  className="text-custom-black p-2 text-2xl rounded-md absolute top-0 right-0 bg-custom-lite-gray/75"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <div className="relative w-full h-[3rem] border border-custom-gray-border rounded-md">
            <label
              htmlFor="file-input"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-custom-gray cursor-pointer"
            >
              {hoverImage ? hoverImage.name : "Choose Hover Image.."}
            </label>
            <input
              id="file-input"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) =>
                handleFileChange(e, setHoverImageThumb, setHoverImage)
              }
            />
          </div>
          <div className="w-[20%]">
            {hoverImageThumb ? (
              <img
                src={hoverImageThumb}
                alt="Selected Thumbnail"
                className="w-full h-[8rem] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[8rem] bg-gray-200 rounded-md flex items-center justify-center text-custom-gray" />
            )}
          </div>
        </div>
      </div>
      <div className="w-[20%] ">
        {editedProduct ? (
          <button
            className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
            type="submit"
            onClick={(e) => handleUpdate(e, editedProduct.productId)}
          >
            Update
          </button>
        ) : (
          <button
            className="h-[3rem] flex justify-center items-center w-full bg-custom-blue text-base font-medium text-white rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProductForm;
