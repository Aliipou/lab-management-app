import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionForm = ({
  question,
  testId,
  onSubmit,
  onCancel,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState({
    content: "",
    answerOptions: [
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (question) {
      // If we have a question with answer options
      if (question.answerOptions && question.answerOptions.length > 0) {
        setFormData({
          content: question.content || "",
          answerOptions: question.answerOptions,
        });
      } else {
        // If we have a question but no answer options yet
        setFormData({
          content: question.content || "",
          answerOptions: [
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
          ],
        });
      }
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedOptions = [...prev.answerOptions];
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: field === "isCorrect" ? value === "true" : value,
      };
      return {
        ...prev,
        answerOptions: updatedOptions,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // این خط اضافه شده

    // Validate that at least one option is marked as correct
    const hasCorrectOption = formData.answerOptions.some(
      (option) => option.isCorrect
    );
    if (!hasCorrectOption) {
      alert("Please mark at least one option as correct");
      return;
    }

    // Filter out empty options
    const validOptions = formData.answerOptions.filter(
      (option) => option.content.trim() !== ""
    );
    if (validOptions.length < 2) {
      alert("Please provide at least 2 valid answer options");
      return;
    }

    // Prepare the data for submission
    const questionData = {
      ...formData,
      testId,
      answerOptions: validOptions,
    };

    onSubmit(questionData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {question ? "Edit Question" : "Add New Question"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Question *
            </label>
            <textarea
              id="content"
              name="content"
              rows="3"
              required
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the question text here"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Mark at least one option as correct.
            </p>

            {formData.answerOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={option.isCorrect.toString()}
                  onChange={(e) =>
                    handleOptionChange(index, "isCorrect", e.target.value)
                  }
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="false">Incorrect</option>
                  <option value="true">Correct</option>
                </select>
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.content}
                  onChange={(e) =>
                    handleOptionChange(index, "content", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel || (() => navigate(`/tests/${testId}`))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {loading
                ? "Saving..."
                : question
                ? "Update Question"
                : "Add Question"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
