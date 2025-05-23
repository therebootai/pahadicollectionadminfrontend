import React from "react";

const ViewProduct = ({ product }) => {
  return (
    <section className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-custom-lite">
      <h1 className="text-2xl font-bold text-custom-black">Product Details</h1>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.title}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product Created :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {new Date(product.createdAt).toLocaleDateString("en-In")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Category Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.category?.mainCategory}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Sub Category Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.subCategory}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Sub Sub Category Name :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.subSubCategory}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">Pick Up :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.pickup?.pickupPointName}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product Type :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.productType}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">Price :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.price}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">MRP :</h3>
        <p className="text-lg font-semibold text-custom-blue">{product.mrp}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">In Stock :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.in_stock}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">Discount :</h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.discount}%
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black underline">
          Description :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black underline">
          Main Specification :
        </h3>
        <div className="flex flex-col gap-2 px-2">
          {product.specification?.map((specs) => (
            <div className="grid grid-cols-2 items-center" key={specs._id}>
              <p className="text-lg font-semibold text-custom-black">
                {specs.key}
              </p>
              <p className="text-lg font-semibold text-custom-blue">
                {specs.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      {product.variable?.variableId && (
        <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black underline">
            Variants :
          </h3>
          <div className="flex flex-col gap-1 border-b border-stone-500 last:border-0">
            <div className="grid grid-cols-2 items-center">
              <p className="text-lg font-semibold text-custom-black">
                Variable Name
              </p>
              <p className="text-lg font-semibold text-custom-blue">
                {product.variable?.variableId?.variableName}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-lg font-semibold text-custom-black">
                Variable Value
              </p>
              <p className="text-lg font-semibold text-custom-blue">
                {product.variable?.variableValue}
              </p>
            </div>
          </div>
        </div>
      )}
      {product.main_product && (
        <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black underline">
            Main Product :
          </h3>
          <div className="flex gap-4 ps-2">
            <img
              src={product.main_product?.thumbnail_image?.secure_url}
              alt="product thumbnail"
              className="size-28 object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold">
                {product.main_product?.title}
              </h1>
              <p className="text-sm font-medium capitalize">
                {product.main_product?.productType}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product added to wishlist and cart :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.product_added}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product ordered till now :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.product_ordered}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black">
          Product viewed by customers :
        </h3>
        <p className="text-lg font-semibold text-custom-blue">
          {product.product_viewed}
        </p>
      </div>
      {product.tags?.length > 0 && (
        <div className="flex flex-col gap-2 border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black">
            Product tags :
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, key) => (
              <p
                className="text-lg font-semibold text-custom-blue capitalize"
                key={key}
              >
                {tag.split("_").join(" ")}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black underline">
          Product Images :
        </h3>
        <div className="flex flex-wrap gap-4 px-2">
          {product.productImage?.map((img) => (
            <div
              className="relative cursor-pointer"
              title="Thumbnail"
              key={img._id}
            >
              <img
                src={img.secure_url}
                alt={img.public_id}
                width={450}
                height={450}
                className="w-[12vmax]"
              />
              {img.public_id === product.thumbnail_image?.public_id && (
                <div className="absolute top-0 left-0 w-full h-full border-8 border-custom-gray/60" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
        <h3 className="text-lg font-semibold text-custom-black underline">
          Product Hover Image :
        </h3>
        <img
          src={product.hoverImage?.secure_url}
          alt={product.hoverImage?.public_id}
          width={450}
          height={450}
          className="w-[12vmax]"
        />
      </div>
      {product.variant && product.variant.length > 0 && (
        <div className="grid grid-cols-1 gap-2 items-center border p-1 border-custom-gray">
          <h3 className="text-lg font-semibold text-custom-black underline">
            Variant Product :
          </h3>
          <div className="flex flex-wrap gap-4">
            {product.variant.map((prod) => (
              <div className="flex gap-4 ps-2" key={prod._id}>
                <img
                  src={prod.thumbnail_image?.secure_url}
                  alt="product thumbnail"
                  className="size-28 object-cover"
                />
                <div>
                  <h1 className="text-lg font-semibold">{prod.title}</h1>
                  <p className="text-sm font-medium capitalize">
                    {prod.productType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewProduct;
