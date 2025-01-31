import axios from "axios";
import React, { useEffect, useState } from "react";

const PickUpTable = ({ fetchPickups, pickups, setPickups }) => {
  const [editingPickup, setEditingPickup] = useState(null);
  const [updatedPickup, setUpdatedPickup] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleToggle = async (pickupId, isActive) => {
    try {
      const updatedPickup = { isActive: !isActive };
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/pickups/update/${pickupId}`,
        updatedPickup
      );

      setPickups(
        pickups.map((pickup) =>
          pickup.pickupId === pickupId
            ? { ...pickup, isActive: !pickup.isActive }
            : pickup
        )
      );
    } catch (error) {
      console.error("Error updating Pickup status", error);
      alert("Failed to update Pickup status. Please try again.");
    }
  };

  const handleDeleteConfirm = async (pickupId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/pickups/delete/${pickupId}`
      );

      setPickups(pickups.filter((pickup) => pickup.pickupId !== pickupId));
    } catch (error) {
      console.error("Error deleting Pickup", error);
      alert("Failed to delete Pickup. Please try again.");
    }
  };

  const handleEdit = (pickup) => {
    setEditingPickup(pickup.pickupId);
    setUpdatedPickup({ ...pickup });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    setUpdatedPickup({
      ...updatedPickup,
      [e.target.name]: e.target.value,
    });
  };

  // Validate all required fields and check if mobile number is unique
  const validateForm = async () => {
    const errors = {};
    if (!updatedPickup.pickupPointName)
      errors.pickupPointName = "Name is required";
    if (!updatedPickup.pickupPointLocation)
      errors.pickupPointLocation = "Address is required";
    if (!updatedPickup.pickupPointPinCode)
      errors.pickupPointPinCode = "Pin Code is required";
    if (!updatedPickup.pickupPointMobileno)
      errors.pickupPointMobileno = "Mobile number is required";
    if (updatedPickup.pickupPointMobileno.length !== 10)
      errors.pickupPointMobileno = "Mobile number must be 10 digits";
    if (isNaN(updatedPickup.pickupPointMobileno))
      errors.pickupPointMobileno = "Mobile number must be numeric";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/pickups/update/${editingPickup}`,
        updatedPickup
      );

      setPickups(
        pickups.map((pickup) =>
          pickup.pickupId === editingPickup
            ? { ...pickup, ...updatedPickup }
            : pickup
        )
      );

      setEditingPickup(null);
      setFormErrors({});
    } catch (error) {
      console.error("Error updating Pickup", error);
      alert("Failed to save Pickup. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingPickup(null);
    setUpdatedPickup({});
    setFormErrors({});
  };

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col border border-custom-gray-border rounded-md shadow-custom-lite h-80 overflow-hidden overflow-y-scroll">
        <div className="flex flex-row p-2 bg-custom-offwhite rounded-t-md text-base font-medium">
          <div className="w-[20%]">Name</div>
          <div className="w-[20%]">Address Details</div>
          <div className="w-[20%]">Pin Code</div>
          <div className="w-[20%]">Mobile Number</div>
          <div className="w-[10%]">Status</div>
          <div className="w-[10%]">Action</div>
        </div>
        <div className="p-2 bg-white rounded-b-md">
          {pickups && pickups.length > 0 ? (
            pickups.map((pickup) => (
              <div
                className="flex flex-row p-2 border-b border-custom-gray-border text-base"
                key={pickup.pickupId}
              >
                <div className="w-[20%]">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="text"
                      name="pickupPointName"
                      value={updatedPickup.pickupPointName}
                      onChange={handleInputChange}
                      onInput={handleTextInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    pickup.pickupPointName
                  )}
                  {formErrors.pickupPointName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.pickupPointName}
                    </p>
                  )}
                </div>

                <div className="w-[20%]">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="text"
                      name="pickupPointLocation"
                      value={updatedPickup.pickupPointLocation}
                      onChange={handleInputChange}
                      onInput={handleTextInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    pickup.pickupPointLocation
                  )}
                  {formErrors.pickupPointLocation && (
                    <p className="text-red-500 text-sm">
                      {formErrors.pickupPointLocation}
                    </p>
                  )}
                </div>

                <div className="w-[20%]">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="text"
                      name="pickupPointPinCode"
                      value={updatedPickup.pickupPointPinCode}
                      onChange={handleInputChange}
                      onInput={handleMobileInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    pickup.pickupPointPinCode
                  )}
                  {formErrors.pickupPointPinCode && (
                    <p className="text-red-500 text-sm">
                      {formErrors.pickupPointPinCode}
                    </p>
                  )}
                </div>

                <div className="w-[20%]">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="text"
                      name="pickupPointMobileno"
                      value={updatedPickup.pickupPointMobileno}
                      onChange={handleInputChange}
                      onInput={handleMobileInput}
                      className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
                    />
                  ) : (
                    pickup.pickupPointMobileno
                  )}
                  {formErrors.pickupPointMobileno && (
                    <p className="text-red-500 text-sm">
                      {formErrors.pickupPointMobileno}
                    </p>
                  )}
                </div>

                <div className="w-[10%]">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={pickup.isActive}
                      onChange={() =>
                        handleToggle(pickup.pickupId, pickup.isActive)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="w-[10%]">
                  <div className="flex flex-row gap-3 items-center">
                    {editingPickup === pickup.pickupId ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-base font-medium text-custom-blue"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-base font-medium text-red-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(pickup)}
                        className="text-base font-medium text-custom-blue"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteConfirm(pickup.pickupId)}
                      className="text-base font-medium text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl">No Data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickUpTable;
