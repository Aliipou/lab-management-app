import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const DeviceDetail = ({ device, pictures, guidance, loading }) => {
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!device) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Device not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{device.name}</h1>
        <div className="space-x-2">
          <Link
            to={`/devices/edit/${device.deviceId}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Edit Device
          </Link>
          <Link
            to="/devices"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Back to Devices
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Device Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Model</h3>
              <p className="mt-1">{device.model}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lab</h3>
              <p className="mt-1">
                {device.labId ? (
                  <Link
                    to={`/labs/${device.labId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Lab
                  </Link>
                ) : (
                  "Not assigned to any lab"
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p className="mt-1">{formatDate(device.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Last Updated
              </h3>
              <p className="mt-1">{formatDate(device.updatedAt)}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-600">{device.description}</p>
          </div>
        </div>
      </div>

      {pictures && pictures.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Device Pictures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pictures.map((picture) => (
              <div
                key={picture.pictureId}
                className="rounded-lg overflow-hidden"
              >
                <img
                  src={picture.pictureUrl}
                  alt={`Device ${device.name}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {guidance && guidance.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Guidelines</h2>
          <div className="space-y-4">
            {guidance.map((guide) => (
              <div
                key={guide.guidanceId}
                className="p-4 border border-blue-200 bg-blue-50 rounded-md"
              >
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  {guide.title}
                </h3>
                <p className="text-blue-700">{guide.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;
