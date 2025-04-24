import api, { handleApiError, mockApiCall } from "./api";

// Mock data for schedules - Only used when API is unavailable
const mockSchedules = [
  {
    scheduleId: "1",
    userId: "1",
    labId: "1",
    startTime: "2025-04-15T10:00:00Z",
    endTime: "2025-04-15T12:00:00Z",
    status: "active",
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-10T14:30:00Z",
  },
  {
    scheduleId: "2",
    userId: "2",
    labId: "2",
    startTime: "2025-04-16T14:00:00Z",
    endTime: "2025-04-16T16:00:00Z",
    status: "active",
    createdAt: "2024-03-12T09:15:00Z",
    updatedAt: "2024-03-12T09:15:00Z",
  },
  {
    scheduleId: "3",
    userId: "3",
    labId: "3",
    startTime: "2025-04-17T09:00:00Z",
    endTime: "2025-04-17T11:00:00Z",
    status: "active",
    createdAt: "2024-03-15T11:45:00Z",
    updatedAt: "2024-03-15T11:45:00Z",
  },
];

export const scheduleApi = {
  getAllSchedules: async () => {
    try {
      // Real API call
      const response = await api.get("/Schedule/GetAllSchedules");
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const response = await mockApiCall(mockSchedules);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getScheduleById: async (scheduleId) => {
    try {
      // Real API call
      const response = await api.get(`/Schedule/GetScheduleById/${scheduleId}`);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const schedule = mockSchedules.find((schedule) => schedule.scheduleId === scheduleId);
      if (!schedule) {
        throw new Error("Schedule not found");
      }
      const response = await mockApiCall(schedule);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSchedulesByUserId: async (userId) => {
    try {
      // Real API call
      const response = await api.get(
        `/Schedule/GetSchedulesByUserId/${userId}`
      );
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const schedules = mockSchedules.filter((schedule) => schedule.userId === userId);
      const response = await mockApiCall(schedules);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSchedulesByLabId: async (labId) => {
    try {
      // Real API call
      const response = await api.get(`/Schedule/GetSchedulesByLabId/${labId}`);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const schedules = mockSchedules.filter((schedule) => schedule.labId === labId);
      const response = await mockApiCall(schedules);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createSchedule: async (scheduleData) => {
    try {
      // Real API call
      const payload = {
        ...scheduleData,
        commandSender: {},
      };
      const response = await api.post("/Schedule/CreateSchedule", payload);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const newSchedule = {
        ...scheduleData,
        scheduleId: String(mockSchedules.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await mockApiCall(newSchedule);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateSchedule: async (scheduleData) => {
    try {
      // Real API call
      const payload = {
        ...scheduleData,
        commandSender: {},
      };
      const response = await api.put("/Schedule/UpdateSchedule", payload);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const updatedSchedule = {
        ...scheduleData,
        updatedAt: new Date().toISOString(),
      };
      const response = await mockApiCall(updatedSchedule);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteSchedule: async (scheduleId) => {
    try {
      // Real API call
      const payload = {
        scheduleId,
        commandSender: {},
      };
      const response = await api.delete("/Schedule/DeleteSchedule", {
        data: payload,
      });
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const response = await mockApiCall({ success: true });
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
