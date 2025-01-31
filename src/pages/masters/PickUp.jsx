import { useState } from "react";

import AddPickUpForm from "../../components/masters/pickup/AddPickUpForm";
import PickUpTable from "../../components/masters/pickup/PickUpTable";
import MainPageTemplate from "../../template/MainPageTemplate";
import axios from "axios";

export default function PickUp() {
  const [pickups, setPickups] = useState([]);

  const fetchPickups = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/pickups/get`
      );
      setPickups(response.data.pickupdata);
    } catch (error) {
      console.error("Error fetching Pickup Data:", error);
    }
  };
  return (
    <MainPageTemplate>
      <div className="flex flex-row gap-6 items-center border-b border-custom-gray-border xl:px-8 px-6 p-4">
        <button className="h-[3rem] px-8 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white">
          Export
        </button>
      </div>
      <div className="m-6 p-6 flex flex-col gap-6 bg-white rounded border border-custom-gray-border">
        <h1 className="text-2xl font-medium text-custom-black">
          Pickup Point Manage
        </h1>
        <AddPickUpForm fetchPickups={fetchPickups} />
        <PickUpTable
          fetchPickups={fetchPickups}
          pickups={pickups}
          setPickups={setPickups}
        />
      </div>
    </MainPageTemplate>
  );
}
