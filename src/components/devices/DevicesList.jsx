import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { deviceApi } from "../../api/deviceApi";
import DeviceList from "../../components/devices/DeviceList";

const DevicesList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
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
        console.log("Devices data:", data);
        setDevices(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to load devices");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [location.search]);

  const handleDeleteDevice = async (deviceId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this device? This action cannot be undone."
      )
    ) {
      try {
        await deviceApi.deleteDevice(deviceId);
        setDevices(devices.filter((device) => device.deviceId !== deviceId));
      } catch (err) {
        setError("Failed to delete device");
        console.error("Delete device error:", err);
      }
    }
  };

  // Get the lab ID from query params if it exists
  const queryParams = new URLSearchParams(location.search);
  const labId = queryParams.get("labId");

  return (
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
  );
};

export default DevicesList;
