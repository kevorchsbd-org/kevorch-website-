import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';

import { Home } from './pages/Home';
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Clients = lazy(() => import('./pages/Clients').then(m => ({ default: m.Clients })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));
import { ProtectedRoute } from './components/admin/ProtectedRoute';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <Navbar />}
      <main className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <Preloader />
          <AppContent />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}

export default App;
