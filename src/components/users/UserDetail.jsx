import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const UserDetail = ({
  user,
  profilePictures,
  userTests,
  schedules,
  loading,
}) => {
  if (loading) {
    return <div className="text-center py-10">Loading user details...</div>;
  }

  if (!user) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        User not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {user.firstname} {user.lastname}
        </h1>
        <div className="space-x-2">
          <Link
            to={`/users/edit/${user.userId}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          >
            Edit User
          </Link>
          <Link
            to="/users"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Back to Users
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1">{user.address || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {profilePictures && profilePictures.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
          <div className="flex justify-center">
            <img
              src={profilePictures[0].pictureUrl}
              alt={`${user.firstname} ${user.lastname}`}
              className="h-40 w-40 object-cover rounded-full"
            />
          </div>
        </div>
      )}

      {userTests && userTests.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userTests.map((test) => (
                  <tr key={test.userTestId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/tests/${test.testId}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {test.testName || "View Test"}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {test.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          test.passed
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {test.passed ? "Passed" : "Failed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(test.takenAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {schedules && schedules.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Schedules</h2>
            <Link
              to={`/schedules/new?userId=${user.userId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
            >
              Schedule Lab Time
            </Link>
          </div>
          <div className="space-y-2">
            {schedules.map((schedule) => (
              <div key={schedule.scheduleId} className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      {new Date(schedule.startTime).toLocaleDateString()}{" "}
                      {new Date(schedule.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -
                      {new Date(schedule.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Link
                      to={`/labs/${schedule.labId}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Lab
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/schedules/edit/${schedule.scheduleId}`}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
