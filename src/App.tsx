import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Shield, Cloud, Server, Globe, ChevronRight, Star, CheckCircle, Sun, Moon, X, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ErrorBoundary from './components/ErrorBoundary'
import { ProtectedRoute } from './components/ProtectedRoute';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/HomePage';
import { HostingPage } from './pages/HostingPage';
import { VPSPage } from './pages/VPSPage';
import { VPNPage } from './pages/VPNPage';
import { DomainPage } from './pages/DomainPage';
import { ReferralPage } from './pages/ReferralPage';
import { CompanyPage } from './pages/CompanyPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import './i18n/i18n';
import './shimmer.css';

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/Logo.svg" alt="RetryHost Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold text-primary-500">RetryHost</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-8 ml-8">
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  {t('menu.home')}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'services' ? '' : 'services')}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    <span>{t('menu.services.services')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'services' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                      <Link
                        to="/hosting"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                       <Cloud className="lucide lucide-cloud h-5 w-5 mr-2" /> {t('menu.services.virtual')}
                      </Link>
                      <Link
                        to="/vps"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                       <Server className="lucide lucide-cloud h-5 w-5 mr-2" /> VPS/VDS
                      </Link>
                      <Link
                        to="/vpn"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Shield className="lucide lucide-cloud h-5 w-5 mr-2" /> VPN
                      </Link>
                      <Link
                        to="/domain"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Globe className="lucide lucide-cloud h-5 w-5 mr-2" /> {t('menu.services.domain')}
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/referral" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  {t('menu.referral')}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'about' ? '' : 'about')}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    <span>{t('menu.about.about')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'about' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                      <Link
                        to="/company"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('menu.about.company')}
                      </Link>
                      <Link
                        to="/terms"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('menu.about.terms')}
                      </Link>
                      <Link
                        to="/privacy"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('menu.about.privacy')}
                      </Link>
                      <Link
                        to="/contact"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {t('menu.about.contact')}
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                  >
                    {t('auth.account')}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-semibold"
                  >
                    {t('auth.logout')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                >
                  {t('auth.login')}
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {i18n.language === 'en' ? 'RU' : 'EN'}
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {t('menu.home')}
                </Link>

                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'services' ? '' : 'services')}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <span>{t('menu.services.services')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'services' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link
                        to="/hosting"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.services.virtual')}
                      </Link>
                      <Link
                        to="/vps"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        VPS/VDS
                      </Link>
                      <Link
                        to="/vpn"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        VPN
                      </Link>
                      <Link
                        to="/domain"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.services.domain')}
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/referral"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {t('menu.referral')}
                </Link>

                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'about' ? '' : 'about')}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <span>{t('menu.about.about')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'about' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link
                        to="/company"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.about.company')}
                      </Link>
                      <Link
                        to="/terms"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.about.terms')}
                      </Link>
                      <Link
                        to="/privacy"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.about.privacy')}
                      </Link>
                      <Link
                        to="/contact"
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        {t('menu.about.contact')}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  {user ? (
                    <div className="space-y-4">
                      <Link
                        to="/account"
                        onClick={closeMobileMenu}
                        className="block w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-center font-semibold"
                      >
                        {t('auth.account')}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                        className="block w-full px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg text-center font-semibold"
                      >
                        {t('auth.logout')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        closeMobileMenu();
                      }}
                      className="block w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-center font-semibold"
                    >
                      {t('auth.login')}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => {
                      toggleTheme();
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <button
                    onClick={() => {
                      toggleLanguage();
                      closeMobileMenu();
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    {i18n.language === 'en' ? 'RU' : 'EN'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.company.company')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>{t('footer.company.about')}</li>
                <li>{t('footer.company.contact')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.services.services')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link to="/hosting">{t('footer.services.hosting')}</Link></li>
                <li><Link to="/vps">VPS/VDS</Link></li>
                <li><Link to="/vpn">VPN</Link></li>
                <li><Link to="/domain">{t('footer.services.domain')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.support.support')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>{t('footer.support.help')}</li>
                <li>support@retry.host</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.legal.legal')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link to="/privacy">{t('footer.legal.privacy')}</Link></li>
                <li><Link to="/terms">{t('footer.legal.terms')}</Link></li>
                <li>{t('footer.legal.security')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 RetryHost. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAuthModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isLogin
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('auth.login')}
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    !isLogin
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t('auth.register')}
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('auth.email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('auth.password')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm">{loginError}</div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                >
                  {isLogin ? t('auth.loginButton') : t('auth.registerButton')}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
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