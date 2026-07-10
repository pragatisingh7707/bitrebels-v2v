import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Mentors from './pages/Mentors';
import Communities from './pages/Communities';
import SignupChoice from './pages/SignupChoice';
import ProfileCreate from './pages/ProfileCreate';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/signup" element={<SignupChoice />} />
          <Route path="/profile/create" element={<ProfileCreate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}