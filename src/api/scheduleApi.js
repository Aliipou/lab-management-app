import api, { handleApiError } from "./api";

export const scheduleApi = {
  getAllSchedules: async () => {
    try {
      const response = await api.get("/Schedule/GetAllSchedules");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getScheduleById: async (scheduleId) => {
    try {
      const response = await api.get(`/Schedule/GetScheduleById/${scheduleId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSchedulesByUserId: async (userId) => {
    try {
      const response = await api.get(
        `/Schedule/GetSchedulesByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSchedulesByLabId: async (labId) => {
    try {
      const response = await api.get(`/Schedule/GetSchedulesByLabId/${labId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createSchedule: async (scheduleData) => {
    try {
      const payload = {
        ...scheduleData,
        commandSender: {},
      };
      const response = await api.post("/Schedule/CreateSchedule", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateSchedule: async (scheduleData) => {
    try {
      const payload = {
        ...scheduleData,
        commandSender: {},
      };
      const response = await api.put("/Schedule/UpdateSchedule", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteSchedule: async (scheduleId) => {
    try {
      const payload = {
        scheduleId,
        commandSender: {},
      };
      const response = await api.delete("/Schedule/DeleteSchedule", {
        data: payload,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
