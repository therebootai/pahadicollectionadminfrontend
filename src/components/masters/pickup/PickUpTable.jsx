import React, { useEffect, useState } from "react";
import DisplayTable from "../../global/DisplayTable";
import axiosFetch from "../../../config/axios.config";

const PickUpTable = ({ fetchPickups, pickups, setPickups }) => {
  const [editingPickup, setEditingPickup] = useState(null);
  const [updatedPickup, setUpdatedPickup] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleToggle = async (pickupId, isActive) => {
    try {
      const updatedPickup = { isActive: !isActive };
      await axiosFetch.put(`/pickups/update/${pickupId}`, updatedPickup);

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
      await axiosFetch.delete(`/pickups/delete/${pickupId}`);

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
    setLoading(true);

    try {
      await axiosFetch.put(`/pickups/update/${editingPickup}`, updatedPickup);

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
    } finally {
      setLoading(false);
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
    const value = e.target.value.trimStart();
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  const tableHeader = [
    "Name",
    "Address Details",
    "Pin Code",
    "Mobile Number",
    "status",
    "Action",
  ];

  return (
    <div className="flex flex-col gap-6">
      <DisplayTable tableData={{ tableHeader }}>
        <div className="p-2 bg-white rounded-b-md">
          {pickups && pickups.length > 0 ? (
            pickups.map((pickup) => (
              <div
                className="flex flex-row p-2 border-b border-custom-gray-border text-base"
                key={pickup.pickupId}
              >
                <div className="flex-1">
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

                <div className="flex-1">
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

                <div className="flex-1">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="number"
                      pattern="[0-9]{6}"
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

                <div className="flex-1">
                  {editingPickup === pickup.pickupId ? (
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      minLength={10}
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

                <div className="flex-1">
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

                <div className="flex-1">
                  <div className="flex flex-row gap-3 items-center">
                    {editingPickup === pickup.pickupId ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-base font-medium text-custom-blue"
                        >
                          {loading ? "Saving...." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-base font-medium text-red-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(pickup)}
                          className="text-base font-medium text-custom-blue"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(pickup.pickupId)}
                          className="text-base font-medium text-red-500"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl">No Data</div>
          )}
        </div>
      </DisplayTable>
    </div>
  );
};

export default PickUpTable;
