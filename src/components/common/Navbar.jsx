import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo and brand */}
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-red-600 text-white text-lg font-bold px-3 py-1 rounded mr-3">
                CENTRIA
              </div>
              <Link to="/" className="text-xl font-bold text-white">
                OpenLab Management
              </Link>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-5">
                <NavLink to="/dashboard" active={isActive("/dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink to="/labs" active={isActive("/labs")}>
                  Labs
                </NavLink>
                <NavLink to="/devices" active={isActive("/devices")}>
                  Devices
                </NavLink>
                <NavLink to="/schedules" active={isActive("/schedules")}>
                  Schedules
                </NavLink>
                <NavLink to="/tests" active={isActive("/tests")}>
                  Tests
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink to="/users" active={isActive("/users")}>
                    Users
                  </NavLink>
                )}
              </div>
            )}
          </div>

          {/* Right-side items: profile, notifications, etc. */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                {/* Notification bell */}
                <button className="p-1 ml-3 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                {/* User Profile dropdown */}
                <div className="ml-4 relative">
                  <div>
                    <button
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        {user?.firstname?.charAt(0) || "A"}
                      </div>
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">
                          {user?.firstname} {user?.lastname}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {user?.email}
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign in
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center -mr-2 md:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              to="/dashboard"
              active={isActive("/dashboard")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/labs"
              active={isActive("/labs")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Labs
            </MobileNavLink>
            <MobileNavLink
              to="/devices"
              active={isActive("/devices")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Devices
            </MobileNavLink>
            <MobileNavLink
              to="/schedules"
              active={isActive("/schedules")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schedules
            </MobileNavLink>
            <MobileNavLink
              to="/tests"
              active={isActive("/tests")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tests
            </MobileNavLink>
            {user?.role === "admin" && (
              <MobileNavLink
                to="/users"
                active={isActive("/users")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Users
              </MobileNavLink>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {user?.firstname?.charAt(0) || "A"}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user?.firstname} {user?.lastname}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400 mt-1">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop navigation link
const NavLink = ({ children, to, active }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "text-white bg-gray-800"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink = ({ children, to, active, onClick }) => {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active
          ? "text-white bg-gray-800"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
