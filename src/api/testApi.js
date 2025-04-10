import api, { handleApiError } from "./api";

export const testApi = {
  getAllTests: async () => {
    try {
      const response = await api.get("/Test/GetAllTests");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getTestById: async (testId) => {
    try {
      const response = await api.get(`/Test/GetTestById/${testId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createTest: async (testData) => {
    try {
      const payload = {
        ...testData,
        commandSender: {},
      };
      const response = await api.post("/Test/CreateTest", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateTest: async (testData) => {
    try {
      const payload = {
        ...testData,
        commandSender: {},
      };
      const response = await api.put("/Test/UpdateTest", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteTest: async (testId) => {
    try {
      const payload = {
        testId,
        commandSender: {},
      };
      const response = await api.delete("/Test/DeleteTest", { data: payload });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getQuestionsByTestId: async (testId) => {
    try {
      const response = await api.get(
        `/Question/GetQuestionsByTestId/${testId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAnswerOptionsByQuestionId: async (questionId) => {
    try {
      const response = await api.get(
        `/AnswerOption/GetAnswerOptionsByQuestionId/${questionId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserTestsByUserId: async (userId) => {
    try {
      const response = await api.get(
        `/UserTest/GetUserTestsByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
