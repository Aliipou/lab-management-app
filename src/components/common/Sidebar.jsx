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
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {user?.firstname?.charAt(0) || "A"}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstname} {user?.lastname || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "admin@example.com"}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Main
              </p>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActiveRoute("/dashboard")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActiveRoute("/dashboard")
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>
            </li>

            <li className="mt-4">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Lab Management
              </p>
            </li>
            <li>
              <Link
                to="/labs"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActiveRoute("/labs")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActiveRoute("/labs") ? "text-blue-500" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Labs
              </Link>
            </li>

            <li>
              <Link
                to="/devices"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActiveRoute("/devices")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActiveRoute("/devices")
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                Devices
              </Link>
            </li>

            <li>
              <Link
                to="/schedules"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActiveRoute("/schedules")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActiveRoute("/schedules")
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Schedules
              </Link>
            </li>

            <li>
              <Link
                to="/tests"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActiveRoute("/tests")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    isActiveRoute("/tests") ? "text-blue-500" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Tests
              </Link>
            </li>

            {isAdmin && (
              <>
                <li className="mt-4">
                  <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Administration
                  </p>
                </li>
                <li>
                  <Link
                    to="/users"
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActiveRoute("/users")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <svg
                      className={`mr-3 h-5 w-5 ${
                        isActiveRoute("/users")
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActiveRoute("/settings")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <svg
                      className={`mr-3 h-5 w-5 ${
                        isActiveRoute("/settings")
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Footer with logout button */}
        <div className="border-t border-gray-200 p-4">
          <Link
            to="/login"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
          >
            <svg
              className="mr-3 h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
