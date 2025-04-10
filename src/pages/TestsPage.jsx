import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { testApi } from "../api/testApi";
import TestList from "../components/tests/TestList";
import TestDetail from "../components/tests/TestDetail";
import TestForm from "../components/tests/TestForm";
import QuestionForm from "../components/tests/QuestionForm";

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTests = async () => {
    setLoading(true);
    try {
      const data = await testApi.getAllTests();
      setTests(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tests:", err);
      setError("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTestDetails = async (testId) => {
    setLoading(true);
    try {
      // Fetch test data
      const testData = await testApi.getTestById(testId);
      setSelectedTest(testData);

      // Fetch questions for this test
      const questionsData = await testApi.getQuestionsByTestId(testId);

      // For each question, fetch its answer options
      const questionsWithOptions = await Promise.all(
        questionsData.map(async (question) => {
          const answerOptions = await testApi.getAnswerOptionsByQuestionId(
            question.questionId
          );
          return {
            ...question,
            answerOptions,
          };
        })
      );

      setQuestions(questionsWithOptions);
      setError(null);
    } catch (err) {
      console.error("Error fetching test details:", err);
      setError("Failed to load test details");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (testId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this test? This action cannot be undone."
      )
    ) {
      try {
        await testApi.deleteTest(testId);
        setTests(tests.filter((test) => test.testId !== testId));
        navigate("/tests");
      } catch (err) {
        setError("Failed to delete test");
        console.error("Delete test error:", err);
      }
    }
  };

  const handleSubmitTest = async (formData) => {
    setLoading(true);
    try {
      if (selectedTest) {
        // Update existing test
        await testApi.updateTest({
          ...formData,
          testId: selectedTest.testId,
        });
      } else {
        // Create new test
        await testApi.createTest(formData);
      }
      fetchTests();
      navigate("/tests");
    } catch (err) {
      setError("Failed to save test");
      console.error("Test save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tests</h1>
                <Link
                  to="/tests/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Create New Test
                </Link>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-10">Loading tests...</div>
              ) : (
                <TestList tests={tests} onDelete={handleDeleteTest} />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Create New Test</h1>
              <TestForm
                onSubmit={handleSubmitTest}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/edit/:testId"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Edit Test</h1>
              <TestForm
                test={selectedTest}
                onSubmit={handleSubmitTest}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/:testId"
          element={
            <TestDetail
              test={selectedTest}
              questions={questions}
              loading={loading}
            />
          }
        />
        <Route
          path="/:testId/questions/new"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Add New Question</h1>
              <QuestionForm
                testId={selectedTest?.testId}
                onSubmit={() => {
                  /* Handle question submission */
                }}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/:testId/questions/:questionId"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Edit Question</h1>
              <QuestionForm
                question={selectedQuestion}
                testId={selectedTest?.testId}
                onSubmit={() => {
                  /* Handle question submission */
                }}
                loading={loading}
                error={error}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default TestsPage;
