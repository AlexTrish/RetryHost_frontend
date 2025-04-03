import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthModal = ({
  setShowAuthModal,
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const authInfo = `${email}:${password}`;
      const encodedAuthInfo = encodeURIComponent(authInfo);
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const url = `${apiBaseUrl}/?authinfo=${encodedAuthInfo}&func=auth&out=xjson`;

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(t('auth.error'));
      }

      const data = await response.json();
      console.log(data);
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <form onSubmit={handleAuth} className="space-y-4">
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {loading
              ? t('auth.loading')
              : isLogin
              ? t('auth.loginButton')
              : t('auth.registerButton')}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
