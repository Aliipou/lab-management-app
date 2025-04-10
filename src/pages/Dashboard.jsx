import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { labApi } from "../api/labApi";
import { deviceApi } from "../api/deviceApi";
import { scheduleApi } from "../api/scheduleApi";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [stats, setStats] = useState({
    labs: 0,
    devices: 0,
    upcomingSchedules: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch lab count
        const labs = await labApi.getAllLabs();

        // Fetch device count
        const devices = await deviceApi.getAllDevices();

        // Fetch upcoming schedules (only for the current user if defined)
        let schedules = [];
        if (user && user.userId) {
          schedules = await scheduleApi.getSchedulesByUserId(user.userId);
        } else {
          schedules = await scheduleApi.getAllSchedules();
        }

        // Filter to only include upcoming schedules (those that start after now)
        const now = new Date();
        const upcomingSchedules = schedules.filter(
          (schedule) => new Date(schedule.startTime) > now
        );

        setStats({
          labs: labs.length,
          devices: devices.length,
          upcomingSchedules: upcomingSchedules.length,
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
        console.error("Dashboard data error:", err);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase">Labs</p>
              <p className="text-2xl font-bold mt-1">{stats.labs}</p>
            </div>
            <div className="text-white text-2xl">🔬</div>
          </div>
        </div>

        <div className="bg-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase">Devices</p>
              <p className="text-2xl font-bold mt-1">{stats.devices}</p>
            </div>
            <div className="text-white text-2xl">📱</div>
          </div>
        </div>

        <div className="bg-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase">
                Upcoming Schedules
              </p>
              <p className="text-2xl font-bold mt-1">
                {stats.upcomingSchedules}
              </p>
            </div>
            <div className="text-white text-2xl">📅</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/labs/new"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-md flex items-center justify-center"
          >
            Add New Lab
          </Link>
          <Link
            to="/devices/new"
            className="bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-md flex items-center justify-center"
          >
            Add New Device
          </Link>
          <Link
            to="/schedules/new"
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 px-4 rounded-md flex items-center justify-center"
          >
            Create Schedule
          </Link>
          <Link
            to="/tests/new"
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 px-4 rounded-md flex items-center justify-center"
          >
            Create Test
          </Link>
        </div>
      </div>

      {user && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Upcoming Schedules
          </h2>
          {stats.upcomingSchedules > 0 ? (
            <p className="text-gray-600">
              You have {stats.upcomingSchedules} upcoming scheduled sessions.{" "}
              <Link to="/schedules" className="text-blue-600 hover:underline">
                View all
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              You don't have any upcoming scheduled sessions.{" "}
              <Link
                to="/schedules/new"
                className="text-blue-600 hover:underline"
              >
                Create one
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
