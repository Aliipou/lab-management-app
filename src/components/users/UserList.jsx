import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">No users found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.userId}
          className="bg-white rounded-lg shadow-md overflow-hidden h-full"
        >
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                  {user.firstname?.charAt(0)}
                  {user.lastname?.charAt(0)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex justify-between mt-auto pt-4">
              <Link
                to={`/users/${user.userId}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details
              </Link>
              <div className="space-x-2">
                <Link
                  to={`/users/edit/${user.userId}`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(user.userId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
