import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestForm = ({ test, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (test) {
      setFormData({
        title: test.title || "",
        description: test.description || "",
      });
    }
  }, [test]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // این خط اضافه شده

    // Add timestamps if creating a new test
    const testData = { ...formData };
    if (!test) {
      testData.createdAt = new Date().toISOString();
      testData.updatedAt = new Date().toISOString();
    } else {
      testData.updatedAt = new Date().toISOString();
    }

    onSubmit(testData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {test ? "Edit Test" : "Create New Test"}
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Test Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
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
              onClick={() => navigate("/tests")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {loading ? "Saving..." : test ? "Update Test" : "Create Test"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestForm;
