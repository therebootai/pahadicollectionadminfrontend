import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../config/axios.config";

const authState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authState);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axiosFetch.get(
        `/users/check-auth`,
        { withCredentials: true } // Ensure cookies are sent
      );

      if (response.data.user) {
        dispatch({ type: "LOGIN", payload: response.data.user });
      } else {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  // Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
