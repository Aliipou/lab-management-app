import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LabsPage from "./pages/LabsPage";
import DevicesPage from "./pages/DevicesPage";
import SchedulePage from "./pages/SchedulePage";
import TestsPage from "./pages/TestsPage";
import UsersPage from "./pages/UsersPage";

// Components
import Header from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/common/PrivateRoute";

// Context
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isAuthenticated={isAuthenticated} onLogout={logout} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage onLogin={login} />
                )
              }
            />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/labs/*" element={<LabsPage />} />
              <Route path="/devices/*" element={<DevicesPage />} />
              <Route path="/schedules/*" element={<SchedulePage />} />
              <Route path="/tests/*" element={<TestsPage />} />
              <Route path="/users/*" element={<UsersPage />} />
            </Route>

            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
