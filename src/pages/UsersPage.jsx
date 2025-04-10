import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import { scheduleApi } from "../api/scheduleApi";
import { testApi } from "../api/testApi";
import UserList from "../components/users/UserList";
import UserDetail from "../components/users/UserDetail";
import UserForm from "../components/users/UserForm";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profilePictures, setProfilePictures] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [userSchedules, setUserSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userApi.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      // Fetch user data
      const userData = await userApi.getUserById(userId);
      setSelectedUser(userData);

      // Fetch profile pictures
      const picturesData = await userApi.getUserProfilePictures(userId);
      setProfilePictures(picturesData);

      // Fetch user tests
      const userTestsData = await testApi.getUserTestsByUserId(userId);
      setUserTests(userTestsData);

      // Fetch user schedules
      const schedulesData = await scheduleApi.getSchedulesByUserId(userId);

      // Filter to only show upcoming schedules
      const now = new Date();
      const upcomingSchedules = schedulesData.filter(
        (schedule) => new Date(schedule.startTime) > now
      );

      setUserSchedules(upcomingSchedules);

      setError(null);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await userApi.deleteUser(userId);
        setUsers(users.filter((user) => user.userId !== userId));
        navigate("/users");
      } catch (err) {
        setError("Failed to delete user");
        console.error("Delete user error:", err);
      }
    }
  };

  const handleSubmitUser = async (formData) => {
    setLoading(true);
    try {
      if (selectedUser) {
        // Update existing user
        await userApi.updateUser({
          ...formData,
          userId: selectedUser.userId,
        });
      } else {
        // Create new user
        await userApi.createUser(formData);
      }
      fetchUsers();
      navigate("/users");
    } catch (err) {
      setError("Failed to save user");
      console.error("User save error:", err);
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
                <h1 className="text-2xl font-bold">Users</h1>
                <Link
                  to="/users/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Add New User
                </Link>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-10">Loading users...</div>
              ) : (
                <UserList users={users} onDelete={handleDeleteUser} />
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Create New User</h1>
              <UserForm
                onSubmit={handleSubmitUser}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/edit/:userId"
          element={
            <>
              <h1 className="text-2xl font-bold mb-6">Edit User</h1>
              <UserForm
                user={selectedUser}
                onSubmit={handleSubmitUser}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route
          path="/:userId"
          element={
            <UserDetail
              user={selectedUser}
              profilePictures={profilePictures}
              userTests={userTests}
              schedules={userSchedules}
              loading={loading}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default UsersPage;
