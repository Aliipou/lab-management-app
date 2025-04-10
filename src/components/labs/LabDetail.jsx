import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const LabDetail = ({ lab, safetyGuidance, pictures, devices, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Lab not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{lab.name}</h1>
        <div className="space-x-2">
          <Link
            to={`/labs/edit/${lab.labId}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Edit Lab
          </Link>
          <Link
            to="/labs"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Back to Labs
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Lab Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Description
            </h3>
            <p className="text-gray-600">{lab.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1">{formatDate(lab.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Last Updated
              </h3>
              <p className="mt-1">{formatDate(lab.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {pictures && pictures.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Lab Pictures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pictures.map((picture) => (
              <div
                key={picture.pictureId}
                className="rounded-lg overflow-hidden"
              >
                <img
                  src={picture.pictureUrl}
                  alt={`Lab ${lab.name}`}
                  className="w-full h-48 object-cover"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {picture.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {safetyGuidance && safetyGuidance.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Safety Guidelines</h2>
          <div className="space-y-4">
            {safetyGuidance.map((guide) => (
              <div
                key={guide.guidanceId}
                className="p-4 border border-yellow-200 bg-yellow-50 rounded-md"
              >
                <h3 className="text-lg font-medium text-yellow-800 mb-2">
                  {guide.title}
                </h3>
                <p className="text-yellow-700">{guide.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Devices in this Lab</h2>
          <Link
            to={`/devices/new?labId=${lab.labId}`}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Add Device
          </Link>
        </div>

        {devices && devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div key={device.deviceId} className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900">{device.name}</h3>
                <p className="text-sm text-gray-500">Model: {device.model}</p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      device.status === "available"
                        ? "bg-green-100 text-green-800"
                        : device.status === "maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : device.status === "in-use"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {device.status === "available"
                      ? "Available"
                      : device.status === "maintenance"
                      ? "Under Maintenance"
                      : device.status === "in-use"
                      ? "In Use"
                      : device.status}
                  </span>
                  <Link
                    to={`/devices/${device.deviceId}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Device
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No devices have been added to this lab yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default LabDetail;
