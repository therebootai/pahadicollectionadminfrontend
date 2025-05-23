import React, { useContext, useEffect } from "react";
import LoginForm from "../components/login/LoginForm";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <main className="h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col bg-white p-6 rounded-md border border-custom-border gap-8 max-w-lg w-full m-4 sm:m-auto">
        <div className="xl:text-lg text-base self-center text-custom-black text-center">
          Welcome back, Login to your account
        </div>
        <img
          src="/images/pahadicollectionlogo.png"
          className="h-[2rem] self-center"
        />
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
