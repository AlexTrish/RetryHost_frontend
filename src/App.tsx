import React, { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
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
const AccountPage = lazy(() => import('./pages/AccountPage').then(module => ({ default: module.AccountPage })));

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
  const { user, login, logout } = useAuth();
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setShowAuthModal(false);
      setLoginError('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setLoginError('Invalid email or password');
    }
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
        />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <Routes>
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
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <Footer />
      </Suspense>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <Suspense fallback={<PageLoader />}>
            <AuthModal 
              setShowAuthModal={setShowAuthModal} 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              loginError={loginError} 
              handleLogin={handleLogin} 
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
    <AuthProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;