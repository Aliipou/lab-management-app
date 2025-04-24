import api, { handleApiError, mockApiCall } from "./api";

// Mock data for tests - Only used when API is unavailable
const mockTests = [
  {
    testId: "1",
    title: "Chemistry Lab Safety",
    description:
      "Basic safety rules and procedures for the chemistry laboratory.",
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
  {
    testId: "2",
    title: "Physics Equipment Operation",
    description: "Test covering the proper use of physics lab equipment.",
    createdAt: "2024-02-15T09:15:00Z",
    updatedAt: "2024-03-10T11:45:00Z",
  },
];

// Mock data for questions - Only used when API is unavailable
const mockQuestions = [
  {
    questionId: "1",
    testId: "1",
    content: "What should you do if there is a chemical spill?",
    createdAt: "2024-02-10T08:30:00Z",
  },
  {
    questionId: "2",
    testId: "1",
    content: "When should you wear safety goggles in the lab?",
    createdAt: "2024-02-10T08:35:00Z",
  },
  {
    questionId: "3",
    testId: "2",
    content: "What is the proper way to use an oscilloscope?",
    createdAt: "2024-02-15T09:30:00Z",
  },
];

// Mock data for answer options - Only used when API is unavailable
const mockAnswerOptions = {
  1: [
    {
      optionId: "1",
      questionId: "1",
      content: "Notify the instructor immediately.",
      isCorrect: true,
    },
    {
      optionId: "2",
      questionId: "1",
      content: "Ignore it if it's small.",
      isCorrect: false,
    },
    {
      optionId: "3",
      questionId: "1",
      content: "Try to clean it yourself without telling anyone.",
      isCorrect: false,
    },
    {
      optionId: "4",
      questionId: "1",
      content: "Cover it with paper towels and leave.",
      isCorrect: false,
    },
  ],
  2: [
    {
      optionId: "5",
      questionId: "2",
      content: "Only when working with dangerous chemicals.",
      isCorrect: false,
    },
    {
      optionId: "6",
      questionId: "2",
      content: "At all times while in the lab.",
      isCorrect: true,
    },
    {
      optionId: "7",
      questionId: "2",
      content: "Only when the instructor tells you to.",
      isCorrect: false,
    },
    {
      optionId: "8",
      questionId: "2",
      content: "Only during experiments, not during demonstrations.",
      isCorrect: false,
    },
  ],
  3: [
    {
      optionId: "9",
      questionId: "3",
      content:
        "Connect the probe to the circuit before turning on the oscilloscope.",
      isCorrect: false,
    },
    {
      optionId: "10",
      questionId: "3",
      content:
        "Turn on the oscilloscope first, then adjust settings, then connect the probe.",
      isCorrect: true,
    },
    {
      optionId: "11",
      questionId: "3",
      content: "It doesn't matter what order you do things in.",
      isCorrect: false,
    },
    {
      optionId: "12",
      questionId: "3",
      content: "Always set the voltage to maximum before connecting.",
      isCorrect: false,
    },
  ],
};

export const testApi = {
  getAllTests: async () => {
    try {
      // Real API call
      const response = await api.get("/Test/GetAllTests");
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const response = await mockApiCall(mockTests);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getTestById: async (testId) => {
    try {
      // Real API call
      const response = await api.get(`/Test/GetTestById/${testId}`);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const test = mockTests.find((test) => test.testId === testId);
      if (!test) {
        throw new Error("Test not found");
      }
      const response = await mockApiCall(test);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createTest: async (testData) => {
    try {
      // Real API call
      const payload = {
        ...testData,
        commandSender: {},
      };
      const response = await api.post("/Test/CreateTest", payload);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const newTest = {
        ...testData,
        testId: String(mockTests.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await mockApiCall(newTest);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateTest: async (testData) => {
    try {
      // Real API call
      const payload = {
        ...testData,
        commandSender: {},
      };
      const response = await api.put("/Test/UpdateTest", payload);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const updatedTest = {
        ...testData,
        updatedAt: new Date().toISOString(),
      };
      const response = await mockApiCall(updatedTest);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteTest: async (testId) => {
    try {
      // Real API call
      const payload = {
        testId,
        commandSender: {},
      };
      const response = await api.delete("/Test/DeleteTest", { data: payload });
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

  getQuestionsByTestId: async (testId) => {
    try {
      // Real API call
      const response = await api.get(
        `/Question/GetQuestionsByTestId/${testId}`
      );
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const questions = mockQuestions.filter(question => question.testId === testId);
      const response = await mockApiCall(questions);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAnswerOptionsByQuestionId: async (questionId) => {
    try {
      // Real API call
      const response = await api.get(
        `/AnswerOption/GetAnswerOptionsByQuestionId/${questionId}`
      );
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const options = mockAnswerOptions[questionId] || [];
      const response = await mockApiCall(options);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserTestsByUserId: async (userId) => {
    try {
      // Real API call
      const response = await api.get(
        `/UserTest/GetUserTestsByUserId/${userId}`
      );
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      // Mock user test results
      const userTests = [
        {
          userTestId: "1",
          userId: userId,
          testId: "1",
          testName: "Chemistry Lab Safety",
          score: "90%",
          passed: true,
          takenAt: "2024-03-01T14:30:00Z",
        },
        {
          userTestId: "2",
          userId: userId,
          testId: "2",
          testName: "Physics Equipment Operation",
          score: "85%",
          passed: true,
          takenAt: "2024-03-05T10:15:00Z",
        }
      ];
      const response = await mockApiCall(userTests);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createQuestion: async (questionData) => {
    try {
      // Real API call
      const payload = {
        ...questionData,
        commandSender: {},
      };
      const response = await api.post("/Question/CreateQuestion", payload);
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const newQuestion = {
        ...questionData,
        questionId: String(mockQuestions.length + 1),
        createdAt: new Date().toISOString(),
      };
      const response = await mockApiCall(newQuestion);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createAnswerOption: async (optionData) => {
    try {
      // Real API call
      const payload = {
        ...optionData,
        commandSender: {},
      };
      const response = await api.post(
        "/AnswerOption/CreateAnswerOption",
        payload
      );
      return response.data;

      // If API is not working, comment above and uncomment below
      /*
      const newOption = {
        ...optionData,
        optionId: String(new Date().getTime()),
      };
      const response = await mockApiCall(newOption);
      return response.data;
      */
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
