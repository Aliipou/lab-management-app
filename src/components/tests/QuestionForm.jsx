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

  const handleSubmit = (e) => {
    e.preventDefault();

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

          {/* Rest of your form code */}
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
