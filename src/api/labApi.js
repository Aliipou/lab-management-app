import api, { handleApiError, mockApiCall } from "./api";

// Toggle between real API and mock
const USE_MOCK_API = true;

const mockLabs = [
  {
    labId: "1",
    name: "Chemistry Lab",
    description:
      "Main chemistry laboratory with 24 workstations, equipped for general chemistry experiments.",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
  },
  {
    labId: "2",
    name: "Physics Lab",
    description:
      "Physics laboratory for mechanics and electromagnetism experiments with specialized equipment.",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-03-18T11:45:00Z",
  },
  {
    labId: "3",
    name: "Biology Lab",
    description:
      "Biology laboratory with microscopy section and culture facilities for biological studies.",
    createdAt: "2024-02-05T10:30:00Z",
    updatedAt: "2024-03-25T15:20:00Z",
  },
];

export const labApi = {
  getAllLabs: async () => {
    try {
      if (USE_MOCK_API) {
        const response = await mockApiCall(mockLabs);
        return response.data;
      }
      const response = await api.get("/Lab/GetAllLabs");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getLabById: async (labId) => {
    try {
      if (USE_MOCK_API) {
        const lab = mockLabs.find((lab) => lab.labId === labId);
        if (!lab) throw new Error("Lab not found");
        const response = await mockApiCall(lab);
        return response.data;
      }
      const response = await api.get(`/Lab/GetLabById/${labId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createLab: async (labData) => {
    try {
      if (USE_MOCK_API) {
        const newLab = {
          ...labData,
          labId: String(mockLabs.length + 1),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const response = await mockApiCall(newLab);
        return response.data;
      }
      const payload = { ...labData, commandSender: {} };
      const response = await api.post("/Lab/CreateLab", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateLab: async (labData) => {
    try {
      if (USE_MOCK_API) {
        const updatedLab = { ...labData, updatedAt: new Date().toISOString() };
        const response = await mockApiCall(updatedLab);
        return response.data;
      }
      const payload = { ...labData, commandSender: {} };
      const response = await api.put("/Lab/UpdateLab", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteLab: async (labId) => {
    try {
      if (USE_MOCK_API) {
        const response = await mockApiCall({ success: true });
        return response.data;
      }
      const payload = { labId, commandSender: {} };
      const response = await api.delete("/Lab/DeleteLab", { data: payload });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getLabPictures: async (labId) => {
    try {
      if (USE_MOCK_API) {
        const pictures = [
          {
            pictureId: "1",
            labId,
            pictureUrl:
              "https://via.placeholder.com/800x600?text=Lab+Picture+1",
            description: "Main view of the laboratory",
            uploadedAt: "2024-02-10T14:20:00Z",
          },
          {
            pictureId: "2",
            labId,
            pictureUrl:
              "https://via.placeholder.com/800x600?text=Lab+Picture+2",
            description: "Equipment area",
            uploadedAt: "2024-02-15T09:45:00Z",
          },
        ];
        const response = await mockApiCall(pictures);
        return response.data;
      }
      const response = await api.get(
        `/LabPicture/GetLabPicturesByLabId/${labId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSafetyGuidance: async (labId) => {
    try {
      if (USE_MOCK_API) {
        const guidance = [
          {
            guidanceId: "1",
            labId,
            title: "General Safety Guidelines",
            content:
              "Always wear appropriate PPE including lab coat, safety glasses, and gloves. Know the location of emergency equipment and exits.",
            createdAt: "2024-01-05T08:30:00Z",
          },
          {
            guidanceId: "2",
            labId,
            title: "Chemical Handling",
            content:
              "Store chemicals properly according to compatibility. Use fume hoods when working with volatile compounds.",
            createdAt: "2024-01-05T08:35:00Z",
          },
        ];
        const response = await mockApiCall(guidance);
        return response.data;
      }
      const response = await api.get(
        `/SafetyGuidance/GetSafetyGuidanceByLabId/${labId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
