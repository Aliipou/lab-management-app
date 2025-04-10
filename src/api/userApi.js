import api, { handleApiError } from "./api";

export const userApi = {
  login: async (credentials) => {
    try {
      const response = await api.post("/User/Login", credentials);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get("/User/GetAllUsers");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/User/GetUserById/${userId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserByEmail: async (email) => {
    try {
      const response = await api.get(`/User/GetUserByEmail/${email}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createUser: async (userData) => {
    try {
      const payload = {
        ...userData,
        commandSender: {},
      };
      const response = await api.post("/User/CreateUser", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (userData) => {
    try {
      const payload = {
        ...userData,
        commandSender: {},
      };
      const response = await api.put("/User/UpdateUser", payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      const payload = {
        userId,
        commandSender: {},
      };
      const response = await api.delete("/User/DeleteUser", { data: payload });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserProfilePictures: async (userId) => {
    try {
      const response = await api.get(
        `/ProfilePicture/GetProfilePicturesByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
