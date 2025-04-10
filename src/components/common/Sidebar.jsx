import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "bg-gray-100 text-gray-900"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  };

  return (
    <div className="hidden md:block w-64 bg-white shadow-md">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/dashboard"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/labs"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/labs"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M1 21h22" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h6" />
              </svg>
              <span className="ml-3">Labs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/devices"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/devices"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="12" y1="6" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              <span className="ml-3">Devices</span>
            </Link>
          </li>
          <li>
            <Link
              to="/schedules"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/schedules"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="ml-3">Schedules</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tests"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/tests"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className="ml-3">Tests</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`flex items-center p-2 rounded-lg ${isActive(
                "/users"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="ml-3">Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
