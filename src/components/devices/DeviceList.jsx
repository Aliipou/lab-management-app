import React from "react";
import { Link } from "react-router-dom";

const DeviceList = ({ devices, onDelete }) => {
  if (!devices || devices.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">
          No devices found. Add your first device to get started.
        </p>
      </div>
    );
  }

  const handleDelete = (e, deviceId) => {
    e.preventDefault(); // Prevent navigation
    onDelete(deviceId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map((device) => (
        <div
          key={device.deviceId}
          className="bg-white rounded-lg shadow-md overflow-hidden h-full"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
            <p className="text-gray-500 mb-2">Model: {device.model}</p>
            <p className="text-gray-600 mb-4 h-20 overflow-hidden">
              {device.description}
            </p>
            <div className="flex justify-between mt-auto pt-4">
              <Link
                to={`/devices/${device.deviceId}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details
              </Link>
              <div className="space-x-2">
                <Link
                  to={`/devices/edit/${device.deviceId}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => handleDelete(e, device.deviceId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
