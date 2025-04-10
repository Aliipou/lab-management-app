import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const TestDetail = ({ test, questions, loading }) => {
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!test) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Test not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{test.title}</h1>
        <div className="space-x-2">
          <Link
            to={`/tests/edit/${test.testId}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Edit Test
          </Link>
          <Link
            to="/tests"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Back to Tests
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Test Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Description
            </h3>
            <p className="text-gray-600">{test.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p className="mt-1">{formatDate(test.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Last Updated
              </h3>
              <p className="mt-1">{formatDate(test.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          <button
            onClick={() => alert("Add question functionality")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Add Question
          </button>
        </div>

        {questions && questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.questionId} className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900">
                  Question {index + 1}
                </h3>
                <p className="mt-1 mb-2">{question.content}</p>

                {question.answerOptions && question.answerOptions.length > 0 ? (
                  <div className="ml-4 mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Answer Options:
                    </h4>
                    <ul className="space-y-1">
                      {question.answerOptions.map((option) => (
                        <li key={option.optionId} className="flex items-start">
                          <span
                            className={`mr-2 ${
                              option.isCorrect
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          >
                            {option.isCorrect ? "✓" : "○"}
                          </span>
                          <span>{option.content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No answer options available.
                  </p>
                )}

                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => alert("Edit question")}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert("Delete question")}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No questions have been added to this test yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TestDetail;
