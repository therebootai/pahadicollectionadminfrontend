import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";

const WishList = () => {
  return (
    <MainPageTemplate>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
      </div>
      <div className="p-4 flex flex-col gap-6"></div>
    </MainPageTemplate>
  );
};

export default WishList;
