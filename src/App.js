import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

// Components
const Header = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-red-600 text-white font-bold text-lg px-3 py-1 rounded mr-3">
              CENTRIA
            </div>
            <h1 className="text-xl font-bold">OpenLab Management</h1>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-8">
              <NavLink isActive={isActive("/dashboard")} to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink isActive={isActive("/labs")} to="/labs">
                Labs
              </NavLink>
              <NavLink isActive={isActive("/devices")} to="/devices">
                Devices
              </NavLink>
              <NavLink isActive={isActive("/schedules")} to="/schedules">
                Schedules
              </NavLink>
              <NavLink isActive={isActive("/tests")} to="/tests">
                Tests
              </NavLink>
              <NavLink isActive={isActive("/users")} to="/users">
                Users
              </NavLink>
            </nav>
          )}

          {/* User menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-white"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-medium">A</span>
                </div>
                <span className="ml-2 hidden md:inline">Admin</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={onLogout}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              Sign in
            </a>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isAuthenticated && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/labs" onClick={() => setIsOpen(false)}>
              Labs
            </MobileNavLink>
            <MobileNavLink to="/devices" onClick={() => setIsOpen(false)}>
              Devices
            </MobileNavLink>
            <MobileNavLink to="/schedules" onClick={() => setIsOpen(false)}>
              Schedules
            </MobileNavLink>
            <MobileNavLink to="/tests" onClick={() => setIsOpen(false)}>
              Tests
            </MobileNavLink>
            <MobileNavLink to="/users" onClick={() => setIsOpen(false)}>
              Users
            </MobileNavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ isActive, to, children }) => (
  <a
    href={to}
    className={`${
      isActive
        ? "text-blue-400 border-b-2 border-blue-400"
        : "text-white hover:text-blue-300"
    } px-1 py-2 text-sm font-medium transition duration-150 ease-in-out`}
  >
    {children}
  </a>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <a
    href={to}
    className="block py-2 text-white hover:text-blue-300"
    onClick={onClick}
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} OpenLab Management System</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Powered by OpenLaboratory</p>
        </div>
      </div>
    </div>
  </footer>
);

// Pages
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin(email, password);
    } else {
      setError("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-6">
          <div className="text-center">
            <span className="inline-block bg-red-600 text-white text-xl font-bold px-4 py-1 rounded">
              CENTRIA
            </span>
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
            OpenLab Management
          </h2>
          <p className="mt-2 text-center text-sm text-blue-200">
            Sign in to access your laboratory management system
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Forgot your password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-700 text-sm"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline hover:from-blue-700 hover:to-indigo-800 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              For demo: Use any email and password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <StatCard
          title="Labs"
          value="5"
          icon={
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
          bgColor="bg-blue-50"
          textColor="text-blue-700"
          link="/labs"
        />

        <StatCard
          title="Devices"
          value="12"
          icon={
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          }
          bgColor="bg-green-50"
          textColor="text-green-700"
          link="/devices"
        />

        <StatCard
          title="Schedules"
          value="3"
          icon={
            <svg
              className="w-8 h-8 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
          bgColor="bg-purple-50"
          textColor="text-purple-700"
          link="/schedules"
        />

        <StatCard
          title="Tests"
          value="2"
          icon={
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          }
          bgColor="bg-yellow-50"
          textColor="text-yellow-700"
          link="/tests"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-5">
              <ActivityItem
                name="John Doe"
                action="added a new device"
                details="Microscope XYZ-100"
                time="2 hours ago"
                avatar="JD"
                color="bg-blue-500"
              />
              <ActivityItem
                name="Alice Smith"
                action="scheduled a lab session"
                details="Chemistry Lab"
                time="Yesterday"
                avatar="AS"
                color="bg-green-500"
              />
              <ActivityItem
                name="Robert Johnson"
                action="created a new test"
                details="Biology Lab Safety Test"
                time="2 days ago"
                avatar="RJ"
                color="bg-purple-500"
              />
            </ul>
          </div>
        </div>

        {/* Upcoming Schedules */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-700">
            <h2 className="text-xl font-bold text-white">Upcoming Schedules</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-5">
              <ScheduleItem
                lab="Chemistry Lab"
                date="Apr 15, 2025"
                time="10:00 AM - 12:00 PM"
                color="border-blue-500"
              />
              <ScheduleItem
                lab="Physics Lab"
                date="Apr 16, 2025"
                time="2:00 PM - 4:00 PM"
                color="border-green-500"
              />
              <ScheduleItem
                lab="Biology Lab"
                date="Apr 17, 2025"
                time="9:00 AM - 11:00 AM"
                color="border-purple-500"
              />
            </ul>
            <div className="mt-4 text-right">
              <a
                href="/schedules"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all schedules →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton
              text="Add New Lab"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
              color="text-blue-700 bg-blue-100 hover:bg-blue-200"
              link="/labs/new"
            />
            <ActionButton
              text="Add Device"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
              color="text-green-700 bg-green-100 hover:bg-green-200"
              link="/devices/new"
            />
            <ActionButton
              text="Schedule Lab"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              color="text-purple-700 bg-purple-100 hover:bg-purple-200"
              link="/schedules/new"
            />
            <ActionButton
              text="Create Test"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
              color="text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
              link="/tests/new"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// UI Components
const StatCard = ({ title, value, icon, bgColor, textColor, link }) => (
  <a
    href={link}
    className={`${bgColor} ${textColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm font-semibold opacity-75">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
    <div className="mt-4 text-sm font-medium">View all →</div>
  </a>
);

const ActivityItem = ({ name, action, details, time, avatar, color }) => (
  <li className="flex items-start">
    <div
      className={`${color} text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0`}
    >
      {avatar}
    </div>
    <div>
      <p className="font-medium text-gray-800">
        <span className="font-bold">{name}</span> {action}
      </p>
      <p className="text-sm text-gray-500">
        {details} • {time}
      </p>
    </div>
  </li>
);

const ScheduleItem = ({ lab, date, time, color }) => (
  <li className={`border-l-4 ${color} pl-4 py-2`}>
    <p className="text-sm text-gray-500">
      {date} • {time}
    </p>
    <p className="font-medium text-gray-800">{lab}</p>
  </li>
);

const ActionButton = ({ text, icon, color, link }) => (
  <a
    href={link}
    className={`${color} flex items-center justify-center py-3 px-4 rounded-md font-medium transition duration-150 ease-in-out`}
  >
    {icon}
    {text}
  </a>
);

// Main App
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing login
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    // In a real app, validate credentials with API
    localStorage.setItem("auth_token", "demo-token");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />

            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
