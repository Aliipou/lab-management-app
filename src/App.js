import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; // Create this if you don't have it

// Simple components for testing
const Home = () => (
  <div className="page">
    <h1>OpenLab Management Home</h1>
    <p>Welcome to the lab management system</p>
  </div>
);
const About = () => (
  <div className="page">
    <h1>About</h1>
    <p>This is a lab management application</p>
  </div>
);

function App() {
  console.log("App is rendering");
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <h1>OpenLab Management</h1>
          <nav>
            <a href="/">Home</a> |<a href="/about">About</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <div className="page">
                  <h1>Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
