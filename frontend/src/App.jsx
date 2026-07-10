import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Mentors from './pages/Mentors';
import Communities from './pages/Communities';
import CommunityDetail from './pages/CommunityDetail';
import CreatePost from './pages/CreatePost';
import Resources from './pages/Resources';
import SignupChoice from './pages/SignupChoice';
import ProfileCreate from './pages/ProfileCreate';
import MentorshipStudent from './pages/MentorshipStudent';
import MentorshipDashboard from './pages/MentorshipDashboard';
import MentorDashboard from './pages/MentorDashboard';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:id" element={<CommunityDetail />} />
          <Route path="/communities/:id/create-post" element={<CreatePost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/signup" element={<SignupChoice />} />
          <Route path="/profile/create" element={<ProfileCreate />} />
          <Route path="/find-mentors" element={<MentorshipStudent />} />
          <Route path="/mentorship-dashboard" element={<MentorshipDashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}