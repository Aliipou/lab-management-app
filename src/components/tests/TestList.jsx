import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const TestList = ({ tests, onDelete }) => {
  if (!tests || tests.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">
          No tests found. Create your first test to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((test) => (
        <div
          key={test.testId}
          className="bg-white rounded-lg shadow-md overflow-hidden h-full"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
            <p className="text-gray-600 mb-4 h-20 overflow-hidden">
              {test.description}
            </p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Created: {formatDate(test.createdAt)}</p>
              <p>Updated: {formatDate(test.updatedAt)}</p>
            </div>
            <div className="flex justify-between mt-auto pt-4">
              <Link
                to={`/tests/${test.testId}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details
              </Link>
              <div className="space-x-2">
                <Link
                  to={`/tests/edit/${test.testId}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(test.testId)}
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

export default TestList;
