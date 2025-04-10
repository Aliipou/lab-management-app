import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { labApi } from "../../api/labApi";

const DeviceForm = ({ device, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    labId: "",
  });
  const [labs, setLabs] = useState([]);
  const [labsLoading, setLabsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabs = async () => {
      setLabsLoading(true);
      try {
        const data = await labApi.getAllLabs();
        setLabs(data);
      } catch (err) {
        console.error("Error fetching labs:", err);
      } finally {
        setLabsLoading(false);
      }
    };

    fetchLabs();
  }, []);

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name || "",
        model: device.model || "",
        description: device.description || "",
        labId: device.labId || "",
      });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add createdAt and updatedAt if creating a new device
    const deviceData = { ...formData };
    if (!device) {
      deviceData.createdAt = new Date().toISOString();
      deviceData.updatedAt = new Date().toISOString();
    } else {
      deviceData.deviceId = device.deviceId;
      deviceData.updatedAt = new Date().toISOString();
    }

    onSubmit(deviceData);
  };

  if (labsLoading) {
    return <div className="text-center py-10">Loading labs...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {device ? "Edit Device" : "Create New Device"}
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Device Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model *
            </label>
            <input
              type="text"
              id="model"
              name="model"
              required
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="labId"
              className="block text-sm font-medium text-gray-700"
            >
              Lab
            </label>
            <select
              id="labId"
              name="labId"
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

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/devices")}
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
                : device
                ? "Update Device"
                : "Create Device"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
