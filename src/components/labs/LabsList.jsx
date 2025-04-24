import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const LabList = ({ labs, onDelete }) => {
  if (!labs || labs.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">
          No labs found. Create your first lab to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {labs.map((lab) => (
        <div
          key={lab.labId}
          className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
        >
          <div className="p-6 flex-grow">
            <h2 className="text-xl font-semibold mb-2">{lab.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{lab.description}</p>
            <div className="mt-3 text-sm text-gray-500">
              <p>Updated: {formatDate(lab.updatedAt)}</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between">
              <Link
                to={`/labs/${lab.labId}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details
              </Link>
              <div className="space-x-2">
                <Link
                  to={`/labs/edit/${lab.labId}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(lab.labId)}
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

export default LabList;
