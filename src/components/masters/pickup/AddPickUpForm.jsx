import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosFetch from "../../../config/axios.config";

const AddPickUpForm = ({ fetchPickups }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    if (data.pickupPointName.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }
    if (data.pickupPointLocation.trim() === "") {
      alert("Please enter a valid location.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosFetch.post(`/pickups/create`, data);

      reset();
      setServerError("");
      fetchPickups();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.response.data.error.includes("Mobile number already exists")
        ) {
          setError("pickupPointMobileno", {
            message: "Mobile number already exists.",
          });
        } else {
          setServerError(error.response.data.error);
        }
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
  };

  const handleTextInput = (e) => {
    const value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex  gap-3 w-full ">
      <div>
        <input
          type="text"
          {...register("pickupPointName", {
            required: "This field is required",
          })}
          placeholder="Name"
          onInput={handleTextInput}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.pickupPointName && (
          <p className="text-red-500 text-sm">
            {errors.pickupPointName.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          {...register("pickupPointLocation", {
            required: "This field is required",
          })}
          placeholder="Pickup Location"
          onInput={handleTextInput}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.pickupPointLocation && (
          <p className="text-red-500 text-sm">
            {errors.pickupPointLocation.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          minLength={6}
          maxLength={6}
          {...register("pickupPointPinCode", {
            required: "This field is required",
          })}
          placeholder="Pin Code"
          onInput={handleMobileInput}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.pickupPointPinCode && (
          <p className="text-red-500 text-sm">
            {errors.pickupPointPinCode.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="tel"
          {...register("pickupPointMobileno", {
            required: "This field is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          })}
          maxLength={10}
          placeholder="Mobile No."
          onInput={handleMobileInput}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.pickupPointMobileno && (
          <p className="text-red-500 text-sm">
            {errors.pickupPointMobileno.message}
          </p>
        )}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        className="h-[3rem] px-6 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default AddPickUpForm;
