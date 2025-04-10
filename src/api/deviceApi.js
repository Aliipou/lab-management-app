import api, { handleApiError } from "./api";

export const deviceApi = {
  getAllDevices: async () => {
    try {
      const response = await api.get("/Device/GetAllDevices");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDeviceById: async (deviceId) => {
    try {
      const response = await api.get(`/Device/GetDeviceById/${deviceId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDevicesByLabId: async (labId) => {
    try {
      const response = await api.get(`/Device/GetDevicesByLabId/${labId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createDevice: async (deviceData) => {
    try {
      const payload = {
        ...deviceData,
        commandSender: {},
      };
      const response = await api.post("/Device/CreateDevice", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateDevice: async (deviceData) => {
    try {
      const payload = {
        ...deviceData,
        commandSender: {},
      };
      const response = await api.put("/Device/UpdateDevice", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteDevice: async (deviceId) => {
    try {
      const payload = {
        deviceId,
        commandSender: {},
      };
      const response = await api.delete("/Device/DeleteDevice", {
        data: payload,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDevicePictures: async (deviceId) => {
    try {
      const response = await api.get(
        `/DevicePicture/GetDevicePicturesByDeviceId/${deviceId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDeviceGuidance: async (deviceId) => {
    try {
      const response = await api.get(
        `/DeviceGuidance/GetDeviceGuidanceByDeviceId/${deviceId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
