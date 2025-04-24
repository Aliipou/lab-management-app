import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deviceApi } from "../../api/deviceApi";
import DeviceForm from "../../components/devices/DeviceForm";

const DeviceCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get labId from query params if it exists
  const queryParams = new URLSearchParams(location.search);
  const labId = queryParams.get("labId");

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Add labId from URL if it exists and not already set in form
      const dataToSubmit = {
        ...formData,
        labId: formData.labId || labId || "",
      };

      const response = await deviceApi.createDevice(dataToSubmit);
      console.log("Device created:", response);

      // Navigate back to the lab page if we came from there
      if (labId) {
        navigate(`/labs/${labId}`);
      } else {
        navigate("/devices");
      }
    } catch (err) {
      console.error("Error creating device:", err);
      setError("Failed to create device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Device</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DeviceForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        initialLabId={labId}
      />
    </>
  );
};

export default DeviceCreate;
