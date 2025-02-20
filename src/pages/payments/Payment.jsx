import React from "react";
import MainPageTemplate from "../../template/MainPageTemplate";
import PaymentTable from "../../components/payments/PaymentTable";

const Payment = () => {
  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Import Payments
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <PaymentTable />
      </div>
    </MainPageTemplate>
  );
};

export default Payment;
