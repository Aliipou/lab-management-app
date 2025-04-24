import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { deviceApi } from "../api/deviceApi";
import DeviceList from "../components/devices/DeviceList";
import DeviceDetail from "../components/devices/DeviceDetail";
import DeviceForm from "../components/devices/DeviceForm";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devicePictures, setDevicePictures] = useState([]);
  const [deviceGuidance, setDeviceGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Fetch all devices or filtered by lab
  const fetchDevices = async () => {
    setLoading(true);
    try {
      // Check if we're filtering by lab
      const queryParams = new URLSearchParams(location.search);
      const labId = queryParams.get("labId");

      let data;
      if (labId) {
        data = await deviceApi.getDevicesByLabId(labId);
      } else {
        data = await deviceApi.getAllDevices();
      }
      console.log("Fetched devices:", data);
      setDevices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [location.search]);

  // Fetch device details when on a device detail page
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      if (!params.deviceId) return;

      setLoading(true);
      try {
        console.log("Fetching device details for ID:", params.deviceId);

        // Fetch device data
        const deviceData = await deviceApi.getDeviceById(params.deviceId);
        setSelectedDevice(deviceData);

        // Fetch device pictures
        const picturesData = await deviceApi.getDevicePictures(params.deviceId);
        setDevicePictures(picturesData);

        // Fetch device guidance
        const guidanceData = await deviceApi.getDeviceGuidance(params.deviceId);
        setDeviceGuidance(guidanceData);

        setError(null);
      } catch (err) {
        console.error("Error fetching device details:", err);
        setError("Failed to load device details");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceDetails();
  }, [params.deviceId]);

  // Delete device
  const handleDeleteDevice = async (deviceId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this device? This action cannot be undone."
      )
    ) {
      try {
        console.log("Deleting device with ID:", deviceId);
        await deviceApi.deleteDevice(deviceId);
        setDevices(devices.filter((device) => device.deviceId !== deviceId));
        navigate("/devices");
      } catch (err) {
        setError("Failed to delete device");
        console.error("Delete device error:", err);
      }
    }
  };

  // Submit device form (create or update)
  const handleSubmitDevice = async (formData) => {
    setLoading(true);
    try {
      console.log("Submitting device data:", formData);

      if (formData.deviceId) {
        // Update existing device
        const updatedDevice = await deviceApi.updateDevice(formData);
        console.log("Device updated:", updatedDevice);
      } else {
        // Create new device
        const newDevice = await deviceApi.createDevice(formData);
        console.log("Device created:", newDevice);
      }
      await fetchDevices();
      navigate("/devices");
    } catch (err) {
      setError("Failed to save device");
      console.error("Device save error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get the lab ID from query params if it exists
  const queryParams = new URLSearchParams(location.search);
  const labId = queryParams.get("labId");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Devices</h1>
              <Link
                to={labId ? `/devices/new?labId=${labId}` : "/devices/new"}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add New Device
              </Link>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <DeviceList devices={devices} onDelete={handleDeleteDevice} />
            )}
          </>
        }
      />
      <Route
        path="/new"
        element={
          <>
            <h1 className="text-2xl font-bold mb-6">Create New Device</h1>
            <DeviceForm
              onSubmit={handleSubmitDevice}
              loading={loading}
              error={error}
            />
          </>
        }
      />
      <Route
        path="/edit/:deviceId"
        element={
          <>
            <h1 className="text-2xl font-bold mb-6">Edit Device</h1>
            <DeviceForm
              device={selectedDevice}
              onSubmit={handleSubmitDevice}
              loading={loading}
              error={error}
            />
          </>
        }
      />
      <Route
        path="/:deviceId"
        element={
          <DeviceDetail
            device={selectedDevice}
            pictures={devicePictures}
            guidance={deviceGuidance}
            loading={loading}
          />
        }
      />
    </Routes>
  );
};

export default DevicesPage;
