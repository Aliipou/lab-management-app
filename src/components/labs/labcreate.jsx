import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { labApi } from "../../api/labApi";
import LabForm from "../../components/labs/LabForm";

const LabCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await labApi.createLab(formData);
      console.log("Lab created:", response);
      navigate("/labs");
    } catch (err) {
      console.error("Error creating lab:", err);
      setError("Failed to create lab");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Lab</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <LabForm onSubmit={handleSubmit} loading={loading} error={error} />
    </>
  );
};

export default LabCreate;
