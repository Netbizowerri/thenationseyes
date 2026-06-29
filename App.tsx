import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminPosts from './pages/AdminPosts';
import AdminComments from './pages/AdminComments';
import Login from './pages/Login';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  // Connection test removed — only run manually in dev if needed

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/category/:categoryName" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/post/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms-of-service" element={<PublicLayout><TermsOfService /></PublicLayout>} />
            <Route path="/disclaimer" element={<PublicLayout><Disclaimer /></PublicLayout>} />
            <Route path="/adminlogin" element={<Login />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
            <Route path="/admin/comments" element={<AdminLayout><AdminComments /></AdminLayout>} />
            <Route path="/login" element={<Navigate to="/adminlogin" replace />} />
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
