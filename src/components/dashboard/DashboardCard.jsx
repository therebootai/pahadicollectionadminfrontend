import React from "react";

const DashboardCard = ({ children, basis }) => {
  return (
    <div
      className={`flex items-center justify-center bg-white shadow-custom min-h-32`}
      style={{ flexBasis: `${basis}%` }}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
