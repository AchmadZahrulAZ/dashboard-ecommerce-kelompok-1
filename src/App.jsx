import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get the token from localStorage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return token ? <Dashboard /> : <LoginPage />;
};

export default App;
