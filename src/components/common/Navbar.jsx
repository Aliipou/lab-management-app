import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white text-lg font-bold">
                OpenLab Manager
              </Link>
            </div>
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/labs"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Labs
                </Link>
                <Link
                  to="/devices"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Devices
                </Link>
                <Link
                  to="/schedules"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Schedules
                </Link>
                <Link
                  to="/tests"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Tests
                </Link>
                <Link
                  to="/users"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                >
                  Users
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-sm mr-4">
                  Welcome, {user?.firstname || "User"}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
