import React, { useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddNewUsers = ({ fetchUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    setError,
  } = useForm();
  const [password, setPassword] = useState("");

  const generatePassword = (name, phone) => {
    if (name && phone.length >= 6) {
      const capitalizedFirstLetter = name.charAt(0).toUpperCase();
      const restOfName = name.substring(1, 4);
      const passwordPart = `${capitalizedFirstLetter}${restOfName}@${phone.substring(
        0,
        2
      )}#${phone.substring(2, 4)}`;
      setPassword(passwordPart);
      setValue("password", passwordPart);
    } else {
      setPassword("Invalid Data for Password Generation");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/users`,
        data
      );
      reset();
      fetchUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.response.data.error.includes("Mobile number already exists.")
        ) {
          setError("phone", {
            message: "Mobile number already exists.",
          });
        } else if (
          error.response.data.error.includes("Email already exists.")
        ) {
          setError("email", {
            message: "Email Id already exists.",
          });
        } else {
          setServerError(error.response.data.error);
        }
      } else {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <form
      className="flex w-full gap-4 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Mobile No."
          {...register("phone", {
            required: "Phone is required",
            minLength: {
              value: 10,
              message: "Phone must be at least 10 digits",
            },
          })}
          maxLength={10}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Password"
          value={password}
          {...register("password", { required: "Password is required" })}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        />
        <button
          type="button"
          onClick={() =>
            generatePassword(getValues("name"), getValues("phone"))
          }
        >
          <TfiReload />
        </button>
      </div>
      <div>
        <select
          {...register("role", { required: "Role is required" })}
          className="px-2 h-[3rem] border border-[#CCCCCC] outline-none placeholder:text-custom-gray rounded-md w-full"
        >
          <option value="">Choose Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Product Manager">Product Manager</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>
      <button
        className="h-[3rem] px-6 flex justify-center items-center bg-custom-violet rounded-md text-lg font-medium text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AddNewUsers;
