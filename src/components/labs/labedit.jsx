import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { labApi } from "../../api/labApi";
import LabForm from "../../components/labs/LabForm";

const LabEdit = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch lab data
  useEffect(() => {
    const fetchLab = async () => {
      if (!labId) {
        setError("Lab ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await labApi.getLabById(labId);
        console.log("Lab to edit:", data);
        setLab(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching lab:", err);
        setError("Failed to load lab data");
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [labId]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await labApi.updateLab({
        ...formData,
        labId: labId,
      });
      navigate("/labs");
    } catch (err) {
      console.error("Error updating lab:", err);
      setError("Failed to update lab");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !lab) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Lab</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <LabForm
        lab={lab}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default LabEdit;
