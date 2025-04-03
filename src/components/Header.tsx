import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Sun, Moon, X, Cloud, Server, Shield, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import '../i18n/i18n';

export default function Header({
        theme,
        toggleTheme,
        toggleLanguage,
        setShowAuthModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeDropdown,
        setActiveDropdown,
    }: {
        theme: string;
        toggleTheme: () => void;
        toggleLanguage: () => void;
        setShowAuthModal: (value: boolean) => void;
        isMobileMenuOpen: boolean;
        setIsMobileMenuOpen: (value: boolean) => void;
        activeDropdown: string;
        setActiveDropdown: (value: string) => void;
    }) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown("");
  };

  return (
    <>
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
                            <button onClick={() => setActiveDropdown(activeDropdown === 'services' ? '' : 'services')} className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400" >
                                <span>{t('menu.services.services')}</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${ activeDropdown === 'services' ? 'rotate-180' : '' }`} />
                            </button>
                            {activeDropdown === 'services' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                                    <Link to="/hosting" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" >
                                        <Cloud className="lucide lucide-cloud h-5 w-5 mr-2" /> {t('menu.services.virtual')}
                                    </Link>
                                    <Link to="/vps" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" >
                                        <Server className="lucide lucide-cloud h-5 w-5 mr-2" /> VPS/VDS
                                    </Link>
                                    <Link to="/vpn" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" >
                                        <Shield className="lucide lucide-cloud h-5 w-5 mr-2" /> VPN
                                    </Link>
                                    <Link to="/domain" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" >
                                        <Globe className="lucide lucide-cloud h-5 w-5 mr-2" /> {t('menu.services.domain')}
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/referral" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                            {t('menu.referral')}
                        </Link>
                        <div className="relative">
                            <button onClick={() => setActiveDropdown(activeDropdown === 'about' ? '' : 'about')} className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                                <span>{t('menu.about.about')}</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${ activeDropdown === 'about' ? 'rotate-180' : '' }`} />
                            </button>
                            {activeDropdown === 'about' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                                    <Link to="/company" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {t('menu.about.company')}
                                    </Link>
                                    <Link to="/terms" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {t('menu.about.terms')}
                                    </Link>
                                    <Link to="/privacy" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {t('menu.about.privacy')}
                                    </Link>
                                    <Link to="/contact" onClick={() => { closeMobileMenu(); setActiveDropdown(""); }} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                            <Link to="/account" className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">
                                {t('auth.account')}
                            </Link>
                            <button onClick={logout} className="px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-semibold">
                                {t('auth.logout')}
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">
                            {t('auth.login')}
                        </button>
                    )}
                        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button onClick={toggleLanguage} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                            {i18n.language === 'en' ? 'RU' : 'EN'}
                      </button>
                    </div>

                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
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
    </>
  );
}
