import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deviceApi } from "../../api/deviceApi";
import DeviceForm from "../../components/devices/DeviceForm";

const DeviceEdit = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch device data
  useEffect(() => {
    const fetchDevice = async () => {
      if (!deviceId) {
        setError("Device ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await deviceApi.getDeviceById(deviceId);
        console.log("Device to edit:", data);
        setDevice(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching device:", err);
        setError("Failed to load device data");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [deviceId]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await deviceApi.updateDevice({
        ...formData,
        deviceId: deviceId,
      });
      navigate("/devices");
    } catch (err) {
      console.error("Error updating device:", err);
      setError("Failed to update device");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !device) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Device</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DeviceForm
        device={device}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default DeviceEdit;
