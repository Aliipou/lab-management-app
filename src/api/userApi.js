import api, { handleApiError, mockApiCall } from "./api";

const mockUsers = [
  {
    userId: "1",
    firstname: "Admin",
    lastname: "User",
    email: "admin@example.com",
    address: "123 Admin St, City",
    role: "admin",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
  {
    userId: "2",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    address: "456 Main St, City",
    role: "instructor",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-03-10T11:45:00Z",
  },
  {
    userId: "3",
    firstname: "Alice",
    lastname: "Smith",
    email: "alice.smith@example.com",
    address: "789 Oak St, City",
    role: "student",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-03-05T15:20:00Z",
  },
];

// Toggle this to true to use mock instead of real API
const USE_MOCK = false;

export const userApi = {
  login: async (credentials) => {
    try {
      if (USE_MOCK) {
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && credentials.password === "password"
        );
        if (!user) throw new Error("Invalid email or password");
        const response = await mockApiCall({
          user,
          token: "mock-jwt-token-for-demo",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        });
        return response.data;
      }

      const response = await api.post("/User/Login", credentials);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAllUsers: async () => {
    try {
      if (USE_MOCK) {
        const response = await mockApiCall(mockUsers);
        return response.data;
      }

      const response = await api.get("/User/GetAllUsers");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserById: async (userId) => {
    try {
      if (USE_MOCK) {
        const user = mockUsers.find((u) => u.userId === userId);
        if (!user) throw new Error("User not found");
        const response = await mockApiCall(user);
        return response.data;
      }

      const response = await api.get(`/User/GetUserById/${userId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserByEmail: async (email) => {
    try {
      if (USE_MOCK) {
        const user = mockUsers.find((u) => u.email === email);
        if (!user) throw new Error("User not found");
        const response = await mockApiCall(user);
        return response.data;
      }

      const response = await api.get(`/User/GetUserByEmail/${email}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createUser: async (userData) => {
    try {
      if (USE_MOCK) {
        const newUser = {
          ...userData,
          userId: String(mockUsers.length + 1),
          role: userData.role || "student",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const response = await mockApiCall(newUser);
        return response.data;
      }

      const response = await api.post("/User/CreateUser", {
        ...userData,
        commandSender: {},
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (userData) => {
    try {
      if (USE_MOCK) {
        const updatedUser = {
          ...userData,
          updatedAt: new Date().toISOString(),
        };
        const response = await mockApiCall(updatedUser);
        return response.data;
      }

      const response = await api.put("/User/UpdateUser", {
        ...userData,
        commandSender: {},
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      if (USE_MOCK) {
        const response = await mockApiCall({ success: true });
        return response.data;
      }

      const response = await api.delete("/User/DeleteUser", {
        data: {
          userId,
          commandSender: {},
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserProfilePictures: async (userId) => {
    try {
      if (USE_MOCK) {
        const pictures = [
          {
            pictureId: "1",
            userId,
            pictureUrl: "https://via.placeholder.com/150?text=Profile",
            isDefault: true,
            uploadedAt: "2024-02-10T14:20:00Z",
          },
        ];
        const response = await mockApiCall(pictures);
        return response.data;
      }

      const response = await api.get(
        `/ProfilePicture/GetProfilePicturesByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
