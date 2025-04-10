import React, { createContext, useReducer, useEffect } from "react";
import { userApi } from "../api/userApi";

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in
  useEffect(() => {
    const loadUser = async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch({ type: "AUTH_ERROR" });
        return;
      }

      try {
        // For demo purposes, simulate getting user info
        // In a real app, you would call something like userApi.getCurrentUser()
        // Using a timeout to simulate an API call
        setTimeout(() => {
          const user = {
            userId: "1",
            firstname: "Admin",
            lastname: "User",
            email: "admin@example.com",
            role: "admin",
          };

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, token },
          });
        }, 500);
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
          payload: "Authentication failed",
        });
      }
    };

    loadUser();
  }, []);

  // Login user
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });

    try {
      // In a real app, this would call the API
      // const response = await userApi.login({ email, password });

      // For demo purposes, we'll simulate a login with hardcoded credentials
      if (email === "admin@example.com" && password === "password") {
        const user = {
          userId: "1",
          firstname: "Admin",
          lastname: "User",
          email: "admin@example.com",
          role: "admin",
        };

        const token = "demo-token-12345";

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });

        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.message || "Login failed",
      });
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
