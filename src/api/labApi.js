// src/api/labApi.js
import api, { handleApiError } from "./api";

export const labApi = {
  getAllLabs: async () => {
    try {
      const response = await api.get("/Lab/GetAllLabs");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  // ... rest of labApi code
};
