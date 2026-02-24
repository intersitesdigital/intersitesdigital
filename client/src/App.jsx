import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LegalPage from './pages/content/LegalPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import RequireAdmin from './components/ui/RequireAdmin';

import PageTransition from './components/ui/PageTransition';
import RouteLoader from './components/ui/RouteLoader';

import { useDarkMode } from './hooks/useDarkMode';

/* ===============================
   Scroll To Top
=============================== */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

/* ===============================
   Layouts
=============================== */
function AdminLayout({ children }) {
  return <>{children}</>;
}

function PublicLayout({ isDark, toggleDarkMode, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

/* ===============================
   App
=============================== */
function App() {
  const location = useLocation();
  const { isDark, toggleDarkMode } = useDarkMode();

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <>
      <ScrollToTop />
      <RouteLoader />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= ADMIN ================= */}
          <Route
            path="/admin-login"
            element={
              <AdminLayout>
                <PageTransition>
                  <AdminLogin />
                </PageTransition>
              </AdminLayout>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminLayout>
                <RequireAdmin>
                  <PageTransition>
                    <AdminDashboard />
                  </PageTransition>
                </RequireAdmin>
              </AdminLayout>
            }
          />

          {/* ================= PUBLIC ================= */}
          <Route
            path="/"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <Home />
                </PageTransition>
              </PublicLayout>
            }
          />

          <Route
            path="/services"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <Services />
                </PageTransition>
              </PublicLayout>
            }
          />

          <Route
            path="/portfolio"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <Portfolio />
                </PageTransition>
              </PublicLayout>
            }
          />

          <Route
            path="/about"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <About />
                </PageTransition>
              </PublicLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <Contact />
                </PageTransition>
              </PublicLayout>
            }
          />

          <Route
            path="/legal/:slug"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <LegalPage />
                </PageTransition>
              </PublicLayout>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PublicLayout isDark={isDark} toggleDarkMode={toggleDarkMode}>
                <PageTransition>
                  <NotFound />
                </PageTransition>
              </PublicLayout>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;