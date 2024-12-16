import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import HomeComponent from '../components/Home Section/HomeComponent';

const Dashboard = () => {
  return (
    <Router>
      <SidebarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/product" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;