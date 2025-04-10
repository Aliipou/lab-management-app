import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isAdmin = user?.role === "admin";

  const isActiveRoute = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transform fixed md:relative z-30 md:z-0 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        {/* Header/Logo Area */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 text-white border-b border-gray-200">
          <div className="flex items-center">
            <span className="bg-red-600 text-white font-bold px-2 py-1 rounded text-sm mr-2">
              CENTRIA
            </span>
            <span className="text-lg font-semibold">OpenLab</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="