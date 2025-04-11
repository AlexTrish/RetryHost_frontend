import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Bell, Shield, LogOut, CreditCard, Box, Activity, Plus, ChevronRight, Check, X, Wallet } from 'lucide-react';
import { ReferralStats } from '../components/ReferralStats';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

interface PaymentMethod {
  id: string;
  last4: string;
  brand: string;
  expiryDate: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'active' | 'suspended' | 'expired';
  expiryDate: string;
  type: 'vps' | 'hosting' | 'domain';
  specs?: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
}

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      const value = obj[key];
      acc[camelKey] = value && typeof value === 'object' && '$' in value ? value.$ : toCamelCase(value);
      return acc;
    }, {} as any);
  }
  return obj;
};

const fetchUserData = async (setUserData: (data: { username: string; email: string }) => void) => {
  const email = Cookies.get('auth_email');
  const password = Cookies.get('auth_password');

  if (!email || !password) {
    console.error('Email or password is missing in cookies');
    return;
  }

  try {
    const response = await axios.get(`https://cp.retry.host/?authinfo=${email}:${password}&func=user&out=xjson`);
    const userData = {
      username: response.data.doc.elem[0].realname.$,
      email: response.data.doc.elem[0].email.$,
    };
    setUserData(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const fetchTransactionHistory = async (setTransactions: (data: any[]) => void) => {
  const email = Cookies.get('auth_email');
  const password = Cookies.get('auth_password');

  if (!email || !password) {
    console.error('Email or password is missing in cookies');
    return;
  }

  try {
    const response = await axios.get(`https://cp.retry.host/?authinfo=${email}:${password}&func=payment&out=xjson`);
    const transactions = response.data.doc.elem.map(toCamelCase);
    setTransactions(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
  }
};

export const AccountPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const email = Cookies.get('auth_email');
    const password = Cookies.get('auth_password');

    if (!email || !password) {
      console.error('Email or password is missing in cookies');
      return;
    }

    fetchUserData(setUserData);
    fetchTransactionHistory(setTransactions);
  }, []);

  if (!Cookies.get('auth_email') || !Cookies.get('auth_password')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('auth.accessDenied')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('auth.pleaseLogin')}
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('account.common.loading')}
          </h2>
        </div>
      </div>
    );
  }

  const { username, email } = userData;

  const balance = 250.00;
  const paymentMethods: PaymentMethod[] = [
    { id: '1', last4: '4242', brand: 'Visa', expiryDate: '12/25' }
  ];
  const services: Service[] = [
    {
      id: '1',
      name: 'VPS Server #1',
      description: 'High-performance VPS with dedicated resources',
      price: 29.99,
      status: 'active',
      expiryDate: '2025-03-20',
      type: 'vps',
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '80 GB SSD',
        bandwidth: 'Unlimited'
      }
    }
  ];

  const availableServices = [
    {
      id: 'vps-basic',
      name: 'Basic VPS',
      description: 'Perfect for small applications',
      price: 19.99,
      type: 'vps',
      specs: {
        cpu: '1 vCPU',
        ram: '2 GB RAM',
        storage: '40 GB SSD',
        bandwidth: '2 TB'
      }
    },
    {
      id: 'vps-pro',
      name: 'Pro VPS',
      description: 'Ideal for growing businesses',
      price: 39.99,
      type: 'vps',
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '80 GB SSD',
        bandwidth: 'Unlimited'
      }
    }
  ];

  const menuItems = [
    { icon: User, label: t('account.dashboard.dash'), id: 'dashboard' },
    { icon: Box, label: t('account.service'), id: 'services' },
    { icon: Wallet, label: t('account.billing'), id: 'billing' },
    { icon: Settings, label: t('account.settings'), id: 'settings' },
    { icon: Shield, label: t('account.security'), id: 'security' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{t('account.balance')}</h3>
            <p className="text-3xl font-bold text-primary-500">${balance.toFixed(2)}</p>
            <button className="mt-4 text-primary-500 hover:text-primary-600 font-medium">
              {t('account.addFunds')}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{t('account.activeServices')}</h3>
            <p className="text-3xl font-bold">{services.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{t('account.nextPayment')}</h3>
            <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">$29.99</p>
            <p className="text-sm text-gray-500">{t('account.dueIn')} 15 {t('account.days')}</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <ReferralStats
          referralCode="RETRY123"
          totalReferrals={5}
          activeReferrals={3}
          totalEarnings={150.00}
          referralLink="https://retry.host/ref/RETRY123"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t('account.recentActivity')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium">VPS Server #1 Renewed</p>
                  <p className="text-sm text-gray-500">March 1, 2025</p>
                </div>
              </div>
              <span className="text-red-500">-$29.99</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">{t('account.services.yourServices')}</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedService(null)}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>{t('account.services.addNew')}</span>
          </motion.button>
        </div>
      </ScrollReveal>

      {selectedService === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">CPU</p>
                        <p className="font-medium">{service.specs.cpu}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">RAM</p>
                        <p className="font-medium">{service.specs.ram}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Storage</p>
                        <p className="font-medium">{service.specs.storage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bandwidth</p>
                        <p className="font-medium">{service.specs.bandwidth}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-500">${service.price}</p>
                    <p className="text-sm text-gray-500">/month</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedService.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedService.description}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">CPU</p>
                <p className="font-semibold">{selectedService.specs.cpu}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">RAM</p>
                <p className="font-semibold">{selectedService.specs.ram}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Storage</p>
                <p className="font-semibold">{selectedService.specs.storage}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Bandwidth</p>
                <p className="font-semibold">{selectedService.specs.bandwidth}</p>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-bold">${selectedService.price}</p>
                  <p className="text-gray-500">{t('account.perMonth')}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
                >
                  {t('account.purchaseNow')}
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="space-y-4">
        {services.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.1}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="text-xl font-semibold">{service.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.status === 'active' ? 'bg-green-100 text-green-800' :
                      service.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{service.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">CPU</p>
                      <p className="font-medium">{service.specs?.cpu}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">RAM</p>
                      <p className="font-medium">{service.specs?.ram}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Storage</p>
                      <p className="font-medium">{service.specs?.storage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bandwidth</p>
                      <p className="font-medium">{service.specs?.bandwidth}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-500">${service.price}</p>
                  <p className="text-sm text-gray-500">{t('account.expires')}: {new Date(service.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium"
                >
                  {t('account.services.manage')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-medium"
                >
                  {t('account.services.renew')}
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      {/* <ScrollReveal>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Add Funds</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="h-6 w-6 text-primary-500" />
                <div>
                  <h4 className="font-semibold">Cryptomus Payment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pay with your preferred cryptocurrency
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount to Add (USD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Wallet className="h-5 w-5" />
                  <span>Add Funds with Cryptomus</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal> */}

      <ScrollReveal delay={0.2}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t('account.transactions.title')}</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const statusColor =
                transaction.status === 'Зачислен'
                  ? 'font-medium text-primary-500'
                  : transaction.status === 'Отменен'
                  ? 'font-medium text-red-500'
                  : 'text-gray-500';

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.paymethodName || t('account.cryptoPayment.title')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.payDateS || t('account.transactions.date')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`${statusColor} block`}>
                      {transaction.paymethodamountIso}
                    </span>
                    <p className="text-sm text-gray-500">{transaction.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'services':
        return renderServices();
      case 'billing':
        return renderBilling();
      default:
        return <div>{t('account.common.comingSoon')}</div>;
    }
  };

  return (
    <div className="min-h-screen account-shimmer-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <ScrollReveal>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary-500 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {username}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                        activeTab === item.id
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      Cookies.remove('auth_email');
                      Cookies.remove('auth_password');
                      window.location.reload();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{t('auth.logout')}</span>
                  </motion.button>
                </nav>
              </div>
            </ScrollReveal>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {/* <AnimatePresence>
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAddCard(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowAddCard(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl font-semibold mb-6">Add Payment Method</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold mt-6"
                >
                  Add Card
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};