import React, { createContext, useReducer, useEffect } from "react";
import { userApi } from "../api/userApi";

// Make sure to export the context
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
      localStorage.setItem("auth_token", action.payload.token);
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
      localStorage.removeItem("auth_token");
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
      const token = localStorage.getItem("auth_token");

      if (!token) {
        dispatch({ type: "AUTH_ERROR" });
        return;
      }

      try {
        // For demo purposes, simulate getting user info
        // In a real app, you would call something like userApi.getCurrentUser()
        // Using fake user data since this is just a demo
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
      } catch (err) {
        console.error("Auth error:", err);
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
      // For demo purposes, accept any credentials and return mock data
      // const response = await userApi.login({ email, password });

      // Mock successful login response
      const mockResponse = {
        user: {
          userId: "1",
          firstname: "Admin",
          lastname: "User",
          email: email,
          role: "admin",
        },
        token: "mock-jwt-token-for-demo",
      };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: mockResponse,
      });

      return mockResponse.user;
    } catch (err) {
      console.error("Login error:", err);
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
