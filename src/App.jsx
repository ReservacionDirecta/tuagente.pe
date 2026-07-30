import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTop from './components/common/BackToTop';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyCategory from './pages/PropertyCategory';
import PropertyDetail from './pages/PropertyDetail';
import Agents from './pages/Agents';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PropertiesAdmin from './pages/admin/PropertiesAdmin';
import PropertyForm from './pages/admin/PropertyForm';
import UsersAdmin from './pages/admin/UsersAdmin';
import AppointmentsAdmin from './pages/admin/AppointmentsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import BlogForm from './pages/admin/BlogForm';
import WhatsAppButton from './components/ui/WhatsAppButton';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  return user ? children : <Navigate to="/login" />;
};

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <ScrollToTop />
    <BackToTop />
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/propiedades" element={<PublicLayout><Properties /></PublicLayout>} />
          <Route path="/propiedades/:category" element={<PublicLayout><PropertyCategory /></PublicLayout>} />
          <Route path="/propiedad/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
          <Route path="/agentes" element={<PublicLayout><Agents /></PublicLayout>} />
          <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="propiedades" element={<PropertiesAdmin />} />
            <Route path="propiedades/nueva" element={<PropertyForm />} />
            <Route path="propiedades/:id/editar" element={<PropertyForm />} />
            <Route path="usuarios" element={<UsersAdmin />} />
            <Route path="citas" element={<AppointmentsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="blog/nuevo" element={<BlogForm />} />
            <Route path="blog/:id/editar" element={<BlogForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
