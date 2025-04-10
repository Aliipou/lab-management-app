import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { labApi } from "../api/labApi";
import { deviceApi } from "../api/deviceApi";
import { scheduleApi } from "../api/scheduleApi";
import { testApi } from "../api/testApi";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  // Stats state
  const [stats, setStats] = useState({
    labs: 5,
    devices: 12,
    schedules: 3,
    tests: 2,
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Activity items - could be fetched from API in a real implementation
  const activities = [
    {
      id: 1,
      user: { name: "John Doe", initials: "JD" },
      action: "added a new device",
      details: "Microscope XYZ-100",
      time: "2 hours ago",
      color: "bg-blue-500",
    },
    {
      id: 2,
      user: { name: "Alice Smith", initials: "AS" },
      action: "scheduled a lab session",
      details: "Chemistry Lab",
      time: "Yesterday",
      color: "bg-green-500",
    },
    {
      id: 3,
      user: { name: "Robert Johnson", initials: "RJ" },
      action: "created a new test",
      details: "Biology Lab Safety Test",
      time: "2 days ago",
      color: "bg-purple-500",
    },
  ];

  // Upcoming schedules
  const schedules = [
    {
      id: 1,
      date: "Apr 15, 2025",
      time: "10:00 AM - 12:00 PM",
      lab: "Chemistry Lab",
    },
    {
      id: 2,
      date: "Apr 16, 2025",
      time: "2:00 PM - 4:00 PM",
      lab: "Physics Lab",
    },
    {
      id: 3,
      date: "Apr 17, 2025",
      time: "9:00 AM - 11:00 AM",
      lab: "Biology Lab",
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Labs"
            count={stats.labs}
            href="/labs"
            icon={
              <svg
                className="w-10 h-10 text-blue-500"
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
            }
            color="from-blue-500 to-blue-700"
          />

          <StatsCard
            title="Devices"
            count={stats.devices}
            href="/devices"
            icon={
              <svg
                className="w-10 h-10 text-indigo-500"
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
            }
            color="from-indigo-500 to-indigo-700"
          />

          <StatsCard
            title="Schedules"
            count={stats.schedules}
            href="/schedules"
            icon={
              <svg
                className="w-10 h-10 text-purple-500"
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
            }
            color="from-purple-500 to-purple-700"
          />

          <StatsCard
            title="Tests"
            count={stats.tests}
            href="/tests"
            icon={
              <svg
                className="w-10 h-10 text-pink-500"
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
            }
            color="from-pink-500 to-pink-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 border-b">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {activities.map((activity) => (
                <div key={activity.id} className="p-6 flex items-start">
                  <div
                    className={`flex-shrink-0 ${activity.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-medium`}
                  >
                    {activity.user.initials}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      {activity.action}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{activity.details}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedules */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 border-b">
              <h2 className="text-xl font-bold text-white">
                Upcoming Schedules
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-purple-500"
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
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {schedule.lab}
                      </h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{schedule.date}</span>
                        <span className="mx-1">•</span>
                        <span>{schedule.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <Link
                to="/schedules"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View All Schedules →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 border-b">
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton
                href="/labs/new"
                icon={
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
                text="Add New Lab"
                color="bg-blue-100 text-blue-700 hover:bg-blue-200"
              />

              <QuickActionButton
                href="/devices/new"
                icon={
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
                text="Add Device"
                color="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              />

              <QuickActionButton
                href="/schedules/new"
                icon={
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
                text="Schedule Lab"
                color="bg-purple-100 text-purple-700 hover:bg-purple-200"
              />

              <QuickActionButton
                href="/tests/new"
                icon={
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
                text="Create Test"
                color="bg-pink-100 text-pink-700 hover:bg-pink-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, count, href, icon, color }) => (
  <Link
    to={href}
    className="transform transition-all duration-300 hover:scale-105"
  >
    <div
      className={`bg-gradient-to-r ${color} text-white rounded-xl shadow-lg overflow-hidden`}
    >
      <div className="px-6 py-5 sm:p-6 flex items-center">
        <div className="p-3 rounded-full bg-white bg-opacity-10 shadow-inner">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <div className="text-sm font-medium text-white opacity-75 truncate">
            {title}
          </div>
          <div className="mt-1 flex items-baseline">
            <div className="text-3xl font-semibold text-white">{count}</div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black bg-opacity-10 px-6 py-2 text-right">
        <span className="text-sm text-white text-opacity-75">View all →</span>
      </div>
    </div>
  </Link>
);

// Quick Action Button
const QuickActionButton = ({ href, icon, text, color }) => (
  <Link
    to={href}
    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium ${color} transition-colors duration-200`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Dashboard;
