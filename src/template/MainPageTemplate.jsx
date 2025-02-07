import React, { useEffect } from "react";
import TopHeader from "../components/global/TopHeader";

const MainPageTemplate = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="flex w-full h-full flex-col overflow-x-hidden ">
        <div className="flex flex-col">
          <div>
            <TopHeader />
          </div>
        </div>

        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainPageTemplate;
