// src/context/AuthContext.js - minimal implementation
import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    // Your reducer cases
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
