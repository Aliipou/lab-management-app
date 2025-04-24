import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { labApi } from "../api/labApi";
import { deviceApi } from "../api/deviceApi";

// Let's try a few different import options based on what might exist
// The component that actually renders the list of labs
// Uncomment the one that matches your file structure
// import LabList from "../components/labs/LabList"; // Standard PascalCase
// import LabList from "../components/labs/lablist"; // All lowercase
// import LabList from "../components/labs/lablist.jsx"; // Explicit extension
// import LabList from "../components/labs/LabsList"; // Plural form
// import LabList from "../components/labs/lab-list"; // Kebab case
// You can also create your own LabList component inline:

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

  const handleDelete = (e, labId) => {
    e.preventDefault(); // Prevent link navigation
    onDelete(labId);
  };

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
                  onClick={(e) => handleDelete(e, lab.labId)}
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

// Lab Detail component defined inline to avoid import issues
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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

// LabForm component defined inline to avoid import issues
const LabForm = ({ lab, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (lab) {
      setFormData({
        name: lab.name || "",
        description: lab.description || "",
      });
    }
  }, [lab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add labId if editing an existing lab
    const submitData = lab ? { ...formData, labId: lab.labId } : formData;

    onSubmit(submitData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {lab ? "Edit Lab" : "Create New Lab"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Lab Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
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
              onClick={() => navigate("/labs")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : lab ? "Update Lab" : "Create Lab"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labPictures, setLabPictures] = useState([]);
  const [safetyGuidance, setSafetyGuidance] = useState([]);
  const [labDevices, setLabDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  // Fetch all labs
  const fetchLabs = async () => {
    setLoading(true);
    try {
      const data = await labApi.getAllLabs();
      console.log("Fetched labs:", data);
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

  // Fetch lab details when on a lab detail page
  useEffect(() => {
    const fetchLabDetails = async () => {
      if (!params.labId) return;

      setLoading(true);
      try {
        console.log("Fetching lab details for ID:", params.labId);

        // Fetch lab data
        const labData = await labApi.getLabById(params.labId);
        setSelectedLab(labData);

        // Fetch lab pictures
        const picturesData = await labApi.getLabPictures(params.labId);
        setLabPictures(picturesData);

        // Fetch safety guidance
        const guidanceData = await labApi.getSafetyGuidance(params.labId);
        setSafetyGuidance(guidanceData);

        // Fetch devices in this lab
        const devicesData = await deviceApi.getDevicesByLabId(params.labId);
        setLabDevices(devicesData);

        setError(null);
      } catch (err) {
        console.error("Error fetching lab details:", err);
        setError("Failed to load lab details");
      } finally {
        setLoading(false);
      }
    };

    fetchLabDetails();
  }, [params.labId]);

  // Delete lab
  const handleDeleteLab = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lab? This action cannot be undone."
      )
    ) {
      try {
        console.log("Deleting lab with ID:", id);
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
        const updatedLab = await labApi.updateLab(formData);
        console.log("Lab updated:", updatedLab);
      } else {
        // Create new lab
        const newLab = await labApi.createLab(formData);
        console.log("Lab created:", newLab);
      }
      await fetchLabs();
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

  // Lab create view
  const LabCreateView = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Lab</h1>
      <LabForm onSubmit={handleSubmitLab} loading={loading} error={error} />
    </>
  );

  // Lab edit view
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
