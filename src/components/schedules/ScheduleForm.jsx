import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { labApi } from "../../api/labApi";
import { userApi } from "../../api/userApi";

const ScheduleForm = ({ schedule, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    userId: "",
    labId: "",
    startTime: "",
    endTime: "",
    status: "active",
  });

  const [labs, setLabs] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const navigate = useNavigate();

  // Format date to YYYY-MM-DDTHH:MM
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetchLoading(true);
      try {
        // Fetch labs and users in parallel
        const [labsData, usersData] = await Promise.all([
          labApi.getAllLabs(),
          userApi.getAllUsers(),
        ]);

        setLabs(labsData);
        setUsers(usersData);
        setFetchError(null);
      } catch (err) {
        console.error("Error fetching form data:", err);
        setFetchError("Failed to load required data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (schedule) {
      setFormData({
        userId: schedule.userId || "",
        labId: schedule.labId || "",
        startTime: formatDateForInput(schedule.startTime) || "",
        endTime: formatDateForInput(schedule.endTime) || "",
        status: schedule.status || "active",
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that end time is after start time
    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      alert("End time must be after start time");
      return;
    }

    onSubmit(formData);
  };

  if (fetchLoading) {
    return <div className="text-center py-10">Loading data...</div>;
  }

  if (fetchError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {schedule ? "Edit Schedule" : "Create New Schedule"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User *
            </label>
            <select
              id="userId"
              name="userId"
              required
              value={formData.userId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="labId"
              className="block text-sm font-medium text-gray-700"
            >
              Lab *
            </label>
            <select
              id="labId"
              name="labId"
              required
              value={formData.labId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a lab</option>
              {labs.map((lab) => (
                <option key={lab.labId} value={lab.labId}>
                  {lab.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time *
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                End Time *
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                required
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {schedule && (
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/schedules")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {loading
                ? "Saving..."
                : schedule
                ? "Update Schedule"
                : "Create Schedule"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
