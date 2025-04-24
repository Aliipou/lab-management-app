import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { labApi } from "../api/labApi";
import { deviceApi } from "../api/deviceApi";
import LabList from "../components/labs/LabList";
import LabDetail from "../components/labs/LabDetail";
import LabForm from "../components/labs/LabForm";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labPictures, setLabPictures] = useState([]);
  const [safetyGuidance, setSafetyGuidance] = useState([]);
  const [labDevices, setLabDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { labId } = useParams();

  // Fetch all labs
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

  // Fetch lab details
  const fetchLabDetails = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      // Fetch lab data
      const labData = await labApi.getLabById(id);
      setSelectedLab(labData);

      // Fetch lab pictures
      const picturesData = await labApi.getLabPictures(id);
      setLabPictures(picturesData);

      // Fetch safety guidance
      const guidanceData = await labApi.getSafetyGuidance(id);
      setSafetyGuidance(guidanceData);

      // Fetch devices in this lab
      const devicesData = await deviceApi.getDevicesByLabId(id);
      setLabDevices(devicesData);

      setError(null);
    } catch (err) {
      console.error("Error fetching lab details:", err);
      setError("Failed to load lab details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch lab details when labId changes
  useEffect(() => {
    if (labId) {
      fetchLabDetails(labId);
    }
  }, [labId]);

  // Delete lab
  const handleDeleteLab = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lab? This action cannot be undone."
      )
    ) {
      try {
        await labApi.deleteLab(id);
        setLabs(labs.filter((lab) => lab.labId !== id));
        navigate("/labs");
      } catch (err) {
        setError("Failed to delete lab");
        console.error("Delete lab error:", err);
      }
    }
  };

  // Submit lab form (create or update)
  const handleSubmitLab = async (formData) => {
    setLoading(true);
    try {
      console.log("Submitting lab data:", formData);

      if (formData.labId) {
        // Update existing lab
        await labApi.updateLab(formData);
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

  // Main labs list view
  const LabsListView = () => (
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

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <LabList labs={labs} onDelete={handleDeleteLab} />
      )}
    </>
  );

  // Lab detail view
  const LabDetailView = () => (
    <LabDetail
      lab={selectedLab}
      safetyGuidance={safetyGuidance}
      pictures={labPictures}
      devices={labDevices}
      loading={loading}
    />
  );

  // Lab form view - create
  const LabCreateView = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Lab</h1>
      <LabForm onSubmit={handleSubmitLab} loading={loading} error={error} />
    </>
  );

  // Lab form view - edit
  const LabEditView = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Lab</h1>
      <LabForm
        lab={selectedLab}
        onSubmit={handleSubmitLab}
        loading={loading}
        error={error}
      />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<LabsListView />} />
      <Route path="/new" element={<LabCreateView />} />
      <Route path="/edit/:labId" element={<LabEditView />} />
      <Route path="/:labId" element={<LabDetailView />} />
    </Routes>
  );
};

export default LabsPage;
