import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { scheduleApi } from "../api/scheduleApi";
import { useAuth } from "../hooks/useAuth";
import ScheduleCalendar from "../components/schedules/ScheduleCalendar";
import ScheduleForm from "../components/schedules/ScheduleForm";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'my', 'lab'
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      let data;

      // Check if we're filtering by lab
      const queryParams = new URLSearchParams(location.search);
      const labId = queryParams.get("labId");

      if (filter === "my" && user?.userId) {
        data = await scheduleApi.getSchedulesByUserId(user.userId);
      } else if ((filter === "lab" || labId) && labId) {
        data = await scheduleApi.getSchedulesByLabId(labId);
        setFilter("lab");
      } else {
        data = await scheduleApi.getAllSchedules();
      }

      setSchedules(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [filter, location.search, user]);

  const fetchScheduleById = async (scheduleId) => {
    setLoading(true);
    try {
      const data = await scheduleApi.getScheduleById(scheduleId);
      setSelectedSchedule(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this schedule? This action cannot be undone."
      )
    ) {
      try {
        await scheduleApi.deleteSchedule(scheduleId);
        setSchedules(
          schedules.filter((schedule) => schedule.scheduleId !== scheduleId)
        );
      } catch (err) {
        setError("Failed to delete schedule");
        console.error("Delete schedule error:", err);
      }
    }
  };

  const handleSubmitSchedule = async (formData) => {
    setLoading(true);
    try {
      if (selectedSchedule) {
        // Update existing schedule
        await scheduleApi.updateSchedule({
          ...formData,
          scheduleId: selectedSchedule.scheduleId,
        });
      } else {
        // Create new schedule
        await scheduleApi.createSchedule(formData);
      }
      fetchSchedules();
      navigate("/schedules");
    } catch (err) {
      setError("Failed to save schedule");
      console.error("Schedule save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Schedules</h1>

                <div className="flex space-x-2">
                  <button
                    className={`py-2 px-4 rounded text-sm ${
                      filter === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => handleFilterChange("all")}
                  >
                    All Schedules
                  </button>
                  {user && (
                    <button
                      className={`py-2 px-4 rounded text-sm ${
                        filter === "my"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                      onClick={() => handleFilterChange("my")}
                    >
                      My Schedules
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-10">Loading schedules...</div>
              ) : (
                <ScheduleCalendar
                  schedules={schedules}
                  onDelete={handleDeleteSchedule}
                />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Create New Schedule</h1>
              <ScheduleForm
                onSubmit={handleSubmitSchedule}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/edit/:scheduleId"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Edit Schedule</h1>
              <ScheduleForm
                schedule={selectedSchedule}
                onSubmit={handleSubmitSchedule}
                loading={loading}
                error={error}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default SchedulePage;
