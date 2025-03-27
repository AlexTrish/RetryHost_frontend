import React, { useEffect, useState, useRef } from 'react';
import { Shield, Cloud, Server, Globe, ChevronRight, Star, CheckCircle, Sun, Moon, X, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AccountPage } from './pages/AccountPage';
import { HostingPage } from './pages/HostingPage';
import { VPSPage } from './pages/VPSPage';
import { VPNPage } from './pages/VPNPage';
import { DomainPage } from './pages/DomainPage';
import './i18n/i18n';
import './shimmer.css';

function AppContent() {
  const { t, i18n } = useTranslation();
  const pricingRef = useRef(null);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Set to false to show registration by default
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [showAccountPage, setShowAccountPage] = useState(false);
  const { user, login, logout } = useAuth();
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    setShowAccountPage(false);
    setCurrentPage('home');
  };

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navigation-menu')) {
        setActiveDropdown('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? '' : name);
  };

  const NavigationMenu = ({ isMobile = false }) => {
    const menuItems = [
      {
        name: 'services',
        label: t('menu.services.services'),
        dropdown: true,
        items: [
          { 
            label: t('menu.services.virtual'), 
            icon: Cloud,
            onClick: () => setCurrentPage('hosting')
          },
          { 
            label: 'VPS/VDS', 
            icon: Server,
            onClick: () => setCurrentPage('vps')
          },
          { 
            label: 'VPN', 
            icon: Shield,
            onClick: () => setCurrentPage('vpn')
          },
          { 
            label: t('menu.services.domain'), 
            icon: Globe,
            onClick: () => setCurrentPage('domain')
          },
        ],
      },
      {
        name: 'referral',
        label: t('menu.referral'),
        href: '/referral',
      },
      {
        name: 'about',
        label: t('menu.about.about'),
        dropdown: true,
        items: [
          { label: t('menu.about.company') },
          { label: t('menu.about.terms') },
          { label: t('menu.about.privacy') },
          { label: t('menu.about.contact') },
        ],
      },
    ];

    return (
      <nav className={`navigation-menu ${isMobile ? 'mobile-menu' : ''}`}>
        <ul className={`
          ${isMobile 
            ? 'flex flex-col space-y-4' 
            : 'hidden md:flex items-center space-x-8'}
        `}>
          <li>
            <a 
              href="#" 
              onClick={() => {
                setCurrentPage('home');
                if (isMobile) setIsMenuOpen(false);
              }} 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              {t('menu.home')}
            </a>
          </li>
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              {item.dropdown ? (
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === item.name ? 'rotate-180' : ''
                  }`} />
                </button>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {item.label}
                </a>
              )}
              {item.dropdown && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`
                    ${isMobile 
                      ? 'mt-2 ml-4 space-y-2' 
                      : 'absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50'}
                  `}
                >
                  {item.items.map((subItem, index) => (
                    <a
                      key={index}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (subItem.onClick) {
                          subItem.onClick();
                          if (isMobile) setIsMenuOpen(false);
                        }
                      }}
                      className={`
                        ${isMobile
                          ? 'flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
                          : 'flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                      `}
                    >
                      {subItem.icon && <subItem.icon className="h-5 w-5" />}
                      <span>{subItem.label}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
    >
      <div className="p-4">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mt-8">
          <NavigationMenu isMobile={true} />
          
          {/* Theme and Language Controls */}
          <div className="mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {theme === 'dark' ? t('theme.light') : t('theme.dark')}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Globe className="h-5 w-5 mr-2" />
              {i18n.language === 'en' ? 'Русский' : 'English'}
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAccountPage(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                >
                  {t('auth.account')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-semibold"
                >
                  {t('auth.logout')}
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowAuthModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
              >
                {t('auth.login')}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'hosting':
        return <HostingPage />;
      case 'vps':
        return <VPSPage />;
      case 'vpn':
        return <VPNPage />;
      case 'domain':
        return <DomainPage />;
      default:
        return (
          <div className="pt-16">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
              <div className="absolute inset-0 shimmer-bg"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative"
              >
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    {t('hero.title')}
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="block text-primary-500"
                    >
                      {t('hero.subtitle')}
                    </motion.span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    {t('hero.description')}
                  </p>
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsLogin(false); // Set to registration mode
                        setShowAuthModal(true);
                      }}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center"
                    >
                      {t('hero.getStarted')} <ChevronRight className="ml-2 h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToPricing}
                      className="border border-primary-500 hover:bg-primary-500/10 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      {t('hero.viewPlans')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-gray-100 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, staggerChildren: 0.2 }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  <FeatureCard
                    icon={<Cloud className="h-8 w-8 text-primary-500" />}
                    title={t('features.virtualHosting.title')}
                    description={t('features.virtualHosting.description')}
                  />
                  <FeatureCard
                    icon={<Server className="h-8 w-8 text-primary-500" />}
                    title={t('features.vps.title')}
                    description={t('features.vps.description')}
                  />
                  <FeatureCard
                    icon={<Shield className="h-8 w-8 text-primary-500" />}
                    title={t('features.security.title')}
                    description={t('features.security.description')}
                  />
                  <FeatureCard
                    icon={<Globe className="h-8 w-8 text-primary-500" />}
                    title={t('features.domains.title')}
                    description={t('features.domains.description')}
                  />
                </motion.div>
              </div>
            </section>

            {/* Pricing Overview */}
            <section ref={pricingRef} className="py-20 scroll-mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-center mb-12"
                >
                  {t('pricing.title')}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, staggerChildren: 0.2 }}
                  className="grid md:grid-cols-3 gap-8"
                >
                  <PricingCard
                    name={t('pricing.plans.starter')}
                    price="15.99"
                    features={[
                      "2GB RAM",
                      "20GB SSD Storage",
                      "1 CPU",
                      "250 MB/s",
                      "24/7 Priority Support",
                    ]}
                  />
                  <PricingCard
                    name={t('pricing.plans.professional')}
                    price="29.99"
                    popular={true}
                    features={[
                      "4GB RAM",
                      "40GB SSD Storage",
                      "3 CPU",
                      "250 MB/s",
                      "24/7 Priority Support",
                    ]}
                  />
                  <PricingCard
                    name={t('pricing.plans.enterprise')}
                    price="39.99"
                    features={[
                      "32GB RAM",
                      "480GB SSD Storage",
                      "8 CPU",
                      "1 GB/s",
                      "24/7 Priority Support",
                      "DDoS Protection"
                    ]}
                  />
                </motion.div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-100 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-center mb-12"
                >
                  {t('testimonials.title')}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, staggerChildren: 0.2 }}
                  className="grid md:grid-cols-3 gap-8"
                >
                  <TestimonialCard
                    name="FName"
                    role="Role"
                    content="content"
                  />
                  <TestimonialCard
                    name="FName"
                    role="Role"
                    content="content"
                  />
                  <TestimonialCard
                    name="FName"
                    role="Role"
                    content="content"
                  />
                </motion.div>
              </div>
            </section>

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
                      <li><a href="#" onClick={() => setCurrentPage('hosting')}>{t('footer.services.hosting')}</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('vps')}>VPS/VDS</a></li>
                      <li><a href="#" onClick={() => setCurrentPage('vpn')}>VPN</a></li>
                      <li>{t('footer.services.domain')}</li>
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
                      <li>{t('footer.legal.privacy')}</li>
                      <li>{t('footer.legal.terms')}</li>
                      <li>{t('footer.legal.security')}</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
                  <p>&copy; 2025 RetryHost. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Toaster />
      {showAccountPage ? (
        <ProtectedRoute>
          <AccountPage onBack={() => setShowAccountPage(false)} />
        </ProtectedRoute>
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <a href="#" onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
                    <img src="/Logo.svg" alt="RetryHost Logo" className="h-8 w-8" />
                    <span className="text-2xl font-bold text-primary-500">RetryHost</span>
                  </a>
                  <div className="ml-8">
                    <NavigationMenu />
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Theme, Language, and Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                  {user ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAccountPage(true)}
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                      >
                        {t('auth.account')}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-semibold"
                      >
                        {t('auth.logout')}
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAuthModal(true)}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                    >
                      {t('auth.login')}
                    </motion.button>
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
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileMenu />
              </>
            )}
          </AnimatePresence>

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

          {renderPage()}
        </>
      )}
    </div>
  );
}

const FeatureCard = motion(({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
});

const PricingCard = motion(({ name, price, features, popular = false }) => {
  const { t } = useTranslation();
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 relative shadow-lg hover:shadow-xl transition-shadow ${popular ? 'ring-2 ring-primary-500' : ''}`}>
      {popular && (
        <span className="absolute top-0 right-0 bg-primary-500 text-sm px-3 py-1 rounded-bl-lg rounded-tr-xl">
          {t('pricing.mostPopular')}
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600 dark:text-gray-400">{t('pricing.perMonth')}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-2 px-4 rounded-lg font-semibold ${
          popular
            ? 'bg-primary-500 hover:bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {t('pricing.getStart')}
      </motion.button>
    </div>
  );
});

const TestimonialCard = motion(({ name, role, content }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Star key={index} className="h-5 w-5 text-primary-500 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{content}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  );
});

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;