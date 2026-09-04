import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Clients } from './pages/Clients';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <ScrollProgress />}
      {!isAdminRoute && <Navbar />}
      <main className="min-h-screen">
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
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <Preloader />
        <Router>
          <AppContent />
        </Router>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
