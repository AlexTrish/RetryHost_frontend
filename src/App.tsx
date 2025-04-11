import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Добавьте импорт Navigate
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Cookies from 'js-cookie';
import './i18n/i18n';
import './shimmer.css';

// Lazy load all pages
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const HostingPage = lazy(() => import('./pages/HostingPage').then(module => ({ default: module.HostingPage })));
const VPSPage = lazy(() => import('./pages/VPSPage').then(module => ({ default: module.VPSPage })));
const VPNPage = lazy(() => import('./pages/VPNPage').then(module => ({ default: module.VPNPage })));
const DomainPage = lazy(() => import('./pages/DomainPage').then(module => ({ default: module.DomainPage })));
const ReferralPage = lazy(() => import('./pages/ReferralPage').then(module => ({ default: module.ReferralPage })));
const CompanyPage = lazy(() => import('./pages/CompanyPage').then(module => ({ default: module.CompanyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
import { AccountPage } from './pages/AccountPage'; // Use named import for AccountPage

// Lazy load Header and Footer
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

// Lazy load Auth Modal
const AuthModal = lazy(() => import('./components/AuthModal'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

function AppContent() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [user, setUser] = useState(() => {
    const savedEmail = Cookies.get('auth_email');
    const savedPassword = Cookies.get('auth_password');
    return savedEmail && savedPassword ? { email: savedEmail } : null;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleAuthEvent = (event: CustomEvent) => {
      setIsLogin(event.detail.isLogin);
      setShowAuthModal(true);
    };

    window.addEventListener('openAuth', handleAuthEvent as EventListener);

    return () => {
      window.removeEventListener('openAuth', handleAuthEvent as EventListener);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove('auth_email');
    Cookies.remove('auth_password');
    setUser(null);
    window.location.reload();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Suspense fallback={<PageLoader />}>
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          toggleLanguage={toggleLanguage} 
          setShowAuthModal={setShowAuthModal} 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          activeDropdown={activeDropdown} 
          setActiveDropdown={setActiveDropdown} 
          user={user} 
          handleLogout={handleLogout} 
        />
      </Suspense>
      <React.StrictMode>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hosting" element={<HostingPage />} />
            <Route path="/vps" element={<VPSPage />} />
            <Route path="/vpn" element={<VPNPage />} />
            <Route path="/domain" element={<DomainPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/account"
              element={user ? <AccountPage /> : <Navigate to="/" replace />}
            />
          </Routes>
        </Suspense>
      </React.StrictMode>
      <Suspense fallback={<PageLoader />}>
        <Footer />
      </Suspense>
      <AnimatePresence>
        {showAuthModal && (
          <Suspense fallback={<PageLoader />}>
            <AuthModal 
              setShowAuthModal={setShowAuthModal} 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} 
            />
          </Suspense>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;