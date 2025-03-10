import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import axiosFetch from "../../config/axios.config";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axiosFetch.post(
        `/users/login`,
        { ...data },
        { withCredentials: true }
      );

      if (response.status === 200) {
        login(response.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(`Failed to login. Reaseon: ${error.message}`);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label
          className="xlg:text-lg text-base font-normal"
          htmlFor="emailOrPhone"
        >
          Mobile Number/ Email ID:
        </label>
        <input
          type="text"
          id="emailOrPhone"
          {...register("email_or_phone")}
          className="bg-[#EFEFEF] text-custom-black placeholder-custom-black rounded-sm xl:rounded-md h-[2.5rem] lg:h-[2.8rem] xl:h-[3rem] px-2 text-sm xl:text-lg outline-none"
        />
        {/* {emailorphoneError && (
          <div className="text-red-500 text-sm mt-1">{emailorphoneError}</div>
        )} */}
      </div>
      <div className="flex flex-col gap-2">
        <label className="xlg:text-lg text-base font-normal" htmlFor="password">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            id="password"
            className="bg-[#EFEFEF] text-custom-black placeholder-custom-black rounded-sm xl:rounded-md h-[2.5rem] lg:h-[2.8rem] xl:h-[3rem] px-2 text-sm xl:text-lg outline-none w-full"
          />
          {/* {emailorphoneError && (
          <div className="text-red-500 text-sm mt-1">{emailorphoneError}</div>
        )} */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-4 text-xl text-custom-violet cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-row gap-1 items-center xlg:text-lg text-base font-medium">
          <input type="checkbox" name="" id="remember_me" />
          <label htmlFor="remember_me" className="select-none">
            Remember me
          </label>
        </div>
        <div className="text-custom-blue xlg:text-lg text-base font-medium">
          Forgot password?
        </div>
      </div>
      <button
        type="submit"
        className="w-[30%] rounded xlg:rounded-md sm:h-[2rem] xl:h-[2.5rem] flex justify-center items-center text-white text-base font-medium bg-custom-violet self-center"
      >
        {/* {loading ? "Wait..." : "Login"} */}
        Login
      </button>
    </form>
  );
};

export default LoginForm;
