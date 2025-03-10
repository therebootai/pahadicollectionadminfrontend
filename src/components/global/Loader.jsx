import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="spinner-border animate-spin border-4 border-t-4 border-custom-violet rounded-full w-10 h-10"></div>
    </div>
  );
};

export default Loader;
