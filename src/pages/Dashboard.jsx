import React from "react";
import MainPageTemplate from "../template/MainPageTemplate";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardAreaChart from "../components/dashboard/DashboardAreaChart";
import DashboardPieChart from "../components/dashboard/DashboardPieChart";

const Dashboard = () => {
  const topRowCardData = [
    {
      basis: 18,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            Total Oders
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            12
          </p>
        </div>
      ),
    },
    {
      basis: 18,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            In-Transist
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            12
          </p>
        </div>
      ),
    },
    {
      basis: 18,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            Delivered
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            10
          </p>
        </div>
      ),
    },
    {
      basis: 18,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            Total Sell
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            ₹5000
          </p>
        </div>
      ),
    },
    {
      basis: 20,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            150+
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            Total Product
          </p>
        </div>
      ),
    },
  ];

  const bottomRowCardData = [
    {
      basis: 100,
      child: (
        <div className="flex flex-col gap-2">
          <h1 className="text-custom-violet text-2xl font-medium text-center">
            200+
          </h1>
          <p className="text-custom-black text-2xl font-semibold text-center">
            Our Total Customer
          </p>
        </div>
      ),
    },
    {
      basis: 100,
      child: (
        <div className="flex flex-col gap-2 flex-1 p-8">
          <p className="text-custom-black text-2xl font-semibold">
            Conversion Rate
          </p>
          <div className="flex flex-1 justify-between">
            <div className="flex-1">
              <DashboardPieChart />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-custom-gray">Add to Cart</h3>
                <p className="text-custom-violet text-base">30%</p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm text-custom-gray">Ravened Left</h3>
                <p className="text-custom-violet text-base">₹3000</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4"></div>
      <div className="p-4 flex flex-col gap-6">
        <div className="flex gap-6">
          {topRowCardData.map((card, key) => (
            <DashboardCard key={key} basis={card.basis}>
              {card.child}
            </DashboardCard>
          ))}
        </div>
        <div className="flex gap-6">
          <DashboardCard basis={76}>
            <div className="min-h-72 w-full flex-1 relative self-stretch">
              <DashboardAreaChart />
            </div>
          </DashboardCard>
          <div className="flex flex-col gap-6 basis-1/5 flex-1">
            {bottomRowCardData.map((card, key) => (
              <DashboardCard key={key} basis={card.basis}>
                {card.child}
              </DashboardCard>
            ))}
          </div>
        </div>
      </div>
    </MainPageTemplate>
  );
};

export default Dashboard;
