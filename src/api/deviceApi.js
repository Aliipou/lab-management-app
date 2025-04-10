import api, { handleApiError, mockApiCall } from "./api";

// Mock data for devices
const mockDevices = [
  {
    deviceId: "1",
    name: "Microscope XYZ-100",
    model: "XYZ-100",
    description:
      "Digital microscope with 1000x magnification and camera attachment",
    labId: "1",
    status: "available",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
  {
    deviceId: "2",
    name: "Spectrophotometer",
    model: "UV-1800",
    description:
      "UV-Vis spectrophotometer for chemical analysis (190-1100 nm range)",
    labId: "1",
    status: "available",
    createdAt: "2024-01-25T09:15:00Z",
    updatedAt: "2024-03-10T11:45:00Z",
  },
  {
    deviceId: "3",
    name: "Centrifuge",
    model: "CR-5000",
    description:
      "High-speed centrifuge with temperature control and multiple rotor options",
    labId: "3",
    status: "maintenance",
    createdAt: "2024-02-05T10:30:00Z",
    updatedAt: "2024-03-25T15:20:00Z",
  },
  {
    deviceId: "4",
    name: "Digital pH Meter",
    model: "PH-220",
    description: "Digital pH meter with temperature compensation",
    labId: "1",
    status: "available",
    createdAt: "2024-02-10T14:00:00Z",
    updatedAt: "2024-03-05T09:30:00Z",
  },
  {
    deviceId: "5",
    name: "Oscilloscope",
    model: "TDS-2024C",
    description: "4-channel digital oscilloscope for electrical measurements",
    labId: "2",
    status: "available",
    createdAt: "2024-01-15T11:20:00Z",
    updatedAt: "2024-03-18T16:45:00Z",
  },
];

export const deviceApi = {
  getAllDevices: async () => {
    try {
      // For a real app
      // const response = await api.get("/Device/GetAllDevices");
      // return response.data;

      // For demo
      const response = await mockApiCall(mockDevices);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDeviceById: async (deviceId) => {
    try {
      // For a real app
      // const response = await api.get(`/Device/GetDeviceById/${deviceId}`);
      // return response.data;

      // For demo
      const device = mockDevices.find((device) => device.deviceId === deviceId);
      if (!device) {
        throw new Error("Device not found");
      }
      const response = await mockApiCall(device);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDevicesByLabId: async (labId) => {
    try {
      // For a real app
      // const response = await api.get(`/Device/GetDevicesByLabId/${labId}`);
      // return response.data;

      // For demo
      const devices = mockDevices.filter((device) => device.labId === labId);
      const response = await mockApiCall(devices);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createDevice: async (deviceData) => {
    try {
      // For a real app
      // const payload = {
      //   ...deviceData,
      //   commandSender: {},
      // };
      // const response = await api.post("/Device/CreateDevice", payload);
      // return response.data;

      // For demo
      const newDevice = {
        ...deviceData,
        deviceId: String(mockDevices.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "available",
      };
      const response = await mockApiCall(newDevice);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateDevice: async (deviceData) => {
    try {
      // For a real app
      // const payload = {
      //   ...deviceData,
      //   commandSender: {},
      // };
      // const response = await api.put("/Device/UpdateDevice", payload);
      // return response.data;

      // For demo
      const updatedDevice = {
        ...deviceData,
        updatedAt: new Date().toISOString(),
      };
      const response = await mockApiCall(updatedDevice);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteDevice: async (deviceId) => {
    try {
      // For a real app
      // const payload = {
      //   deviceId,
      //   commandSender: {},
      // };
      // const response = await api.delete("/Device/DeleteDevice", { data: payload });
      // return response.data;

      // For demo
      const response = await mockApiCall({ success: true });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDevicePictures: async (deviceId) => {
    try {
      // For a real app
      // const response = await api.get(`/DevicePicture/GetDevicePicturesByDeviceId/${deviceId}`);
      // return response.data;

      // For demo
      const pictures = [
        {
          pictureId: "1",
          deviceId: deviceId,
          pictureUrl:
            "https://via.placeholder.com/800x600?text=Device+Picture+1",
          description: "Front view of device",
          uploadedAt: "2024-02-10T14:20:00Z",
        },
        {
          pictureId: "2",
          deviceId: deviceId,
          pictureUrl:
            "https://via.placeholder.com/800x600?text=Device+Picture+2",
          description: "Side view showing controls",
          uploadedAt: "2024-02-15T09:45:00Z",
        },
      ];
      const response = await mockApiCall(pictures);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getDeviceGuidance: async (deviceId) => {
    try {
      // For a real app
      // const response = await api.get(`/DeviceGuidance/GetDeviceGuidanceByDeviceId/${deviceId}`);
      // return response.data;

      // For demo
      const guidance = [
        {
          guidanceId: "1",
          deviceId: deviceId,
          title: "Operating Instructions",
          content:
            "1. Turn on the device using the power button. 2. Allow system to initialize. 3. Calibrate if necessary. 4. Proceed with your experiment.",
          createdAt: "2024-02-01T10:00:00Z",
        },
        {
          guidanceId: "2",
          deviceId: deviceId,
          title: "Maintenance Guide",
          content:
            "Clean the device after each use. Perform calibration monthly. Contact technical support for any issues.",
          createdAt: "2024-02-01T10:15:00Z",
        },
      ];
      const response = await mockApiCall(guidance);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
