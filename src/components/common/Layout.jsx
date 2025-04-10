import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "../../hooks/useAuth";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main
          className={`flex-1 p-4 bg-gray-50 ${isAuthenticated ? "" : "w-full"}`}
        >
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
