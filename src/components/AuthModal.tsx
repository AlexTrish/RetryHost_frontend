import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';

const AuthModal = ({ 
  setShowAuthModal, 
  isLogin, 
  setIsLogin, 
  email: propEmail, 
  setEmail: propSetEmail, 
  password: propPassword, 
  setPassword: propSetPassword,
  onAuthSuccess
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState(propEmail || '');
  const [password, setPassword] = useState(propPassword || '');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (propSetEmail) propSetEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (propSetPassword) propSetPassword(value);
  };

  let regBool = false;

  const apiBaseUrl = 'https://cp.retry.host';

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.5 }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.5 }
    });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      throw new Error(t('auth.passwordMismatch'));
    }

    const url = `${apiBaseUrl}/?_ga=&_ym_uid=&clicked_button=ok&confirm=testaccount12&country=15&currency_fromsite=126&email=${encodeURIComponent(
      email
    )}&email_exists=&field_2=on&func=register&need_manual_action=&newwindow=extform&out=xjson&partner=&passwd=${encodeURIComponent(
      password
    )}&project=1&realname=${encodeURIComponent(
      username
    )}&recaptcha_type=&redirect_auth=&redirect_params=&sesid=&sfromextform=yes&socnetwork_account_exist=&sok=ok&state=&tzoffset=180,0`;

    regBool = true;

    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();

    if (data.doc?.error) {
      throw new Error(data.doc.error.msg.$);
    }

    console.log('Registration successful:', data);

    if (regBool) {
      toast.success('Welcome to RetryHost! 🎉', {
        duration: 3000,
        position: 'top-center',
      });
      triggerConfetti();

      Cookies.set('auth_email', email, { expires: 7 });
      Cookies.set('auth_password', password, { expires: 7 });

      if (onAuthSuccess) {
        onAuthSuccess({ email });
      }

      setShowAuthModal(false);
    }
  };

  const handleLogin = async () => {
    const authInfo = `${email}:${password}`;
    const encodedAuthInfo = encodeURIComponent(authInfo);
    const url = `${apiBaseUrl}/?authinfo=${encodedAuthInfo}&func=auth&out=xjson`;

    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();

    if (data.doc?.error) {
      throw new Error(data.doc.error.msg.$);
    }

    console.log('Login successful:', data);

    if (!regBool) {
      toast.success(`Welcome back, ${email}! 👋`, {
        duration: 3000,
        position: 'top-center',
      });

      Cookies.set('auth_email', email, { expires: 7 });
      Cookies.set('auth_password', password, { expires: 7 });

      if (onAuthSuccess) {
        onAuthSuccess({ email }); // Notify parent component of successful login
      }

      setShowAuthModal(false); // Close the modal
    }

    return data;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
        await handleLogin();
      }

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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowAuthModal(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-sm relative shadow-2xl my-4"
      >
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isLogin ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-3">
          {!isLogin && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('auth.username')}
              </label>
              <div className="relative">
                <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder={t('auth.usernamePlaceholder')}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange} // Use the new handler
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange} // Use the new handler
                className="w-full pl-9 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder={t('auth.passwordPlaceholder')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('auth.confirmPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                />
              </div>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs bg-red-100 dark:bg-red-900/20 p-2 rounded-lg flex items-center"
            >
              <span className="flex-1">{error}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25'
            }`}
          >
            <span>
              {loading
                ? t('auth.loading')
                : isLogin
                ? t('auth.loginButton')
                : t('auth.registerButton')}
            </span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </motion.button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;