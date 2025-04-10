import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { labApi } from "../api/labApi";
import LabList from "../components/labs/LabList";
import LabDetail from "../components/labs/LabDetail";
import LabForm from "../components/labs/LabForm";
import { deviceApi } from "../api/deviceApi";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labPictures, setLabPictures] = useState([]);
  const [safetyGuidance, setSafetyGuidance] = useState([]);
  const [labDevices, setLabDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLabs = async () => {
    setLoading(true);
    try {
      const data = await labApi.getAllLabs();
      setLabs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching labs:", err);
      setError("Failed to load labs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabDetails = async (labId) => {
    setLoading(true);
    try {
      const labData = await labApi.getLabById(labId);
      setSelectedLab(labData);

      // Fetch lab pictures
      const picturesData = await labApi.getLabPictures(labId);
      setLabPictures(picturesData);

      // Fetch safety guidance
      const guidanceData = await labApi.getSafetyGuidance(labId);
      setSafetyGuidance(guidanceData);

      // Fetch devices in this lab
      const devicesData = await deviceApi.getDevicesByLabId(labId);
      setLabDevices(devicesData);

      setError(null);
    } catch (err) {
      console.error("Error fetching lab details:", err);
      setError("Failed to load lab details");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLab = async (labId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lab? This action cannot be undone."
      )
    ) {
      try {
        await labApi.deleteLab(labId);
        setLabs(labs.filter((lab) => lab.labId !== labId));
        navigate("/labs");
      } catch (err) {
        setError("Failed to delete lab");
        console.error("Delete lab error:", err);
      }
    }
  };

  const handleSubmitLab = async (formData) => {
    setLoading(true);
    try {
      if (selectedLab) {
        // Update existing lab
        await labApi.updateLab({
          ...formData,
          labId: selectedLab.labId,
        });
      } else {
        // Create new lab
        await labApi.createLab(formData);
      }
      fetchLabs();
      navigate("/labs");
    } catch (err) {
      setError("Failed to save lab");
      console.error("Lab save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Laboratories</h1>
                <Link
                  to="/labs/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Add New Lab
                </Link>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <LabList labs={labs} onDelete={handleDeleteLab} />
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Create New Lab</h1>
              <LabForm
                onSubmit={handleSubmitLab}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/edit/:labId"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Edit Lab</h1>
              <LabForm
                lab={selectedLab}
                onSubmit={handleSubmitLab}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/:labId"
          element={
            <LabDetail
              lab={selectedLab}
              safetyGuidance={safetyGuidance}
              pictures={labPictures}
              devices={labDevices}
              loading={loading}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default LabsPage;
