import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Bell, Shield, LogOut, CreditCard, Box, Activity, Plus, ChevronRight, Check, X } from 'lucide-react';

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

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Mock data - in a real app, this would come from your backend
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
    { icon: User, label: 'Dashboard', id: 'dashboard' },
    { icon: Box, label: 'Services', id: 'services' },
    { icon: CreditCard, label: 'Billing', id: 'billing' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: Shield, label: 'Security', id: 'security' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Balance</h3>
          <p className="text-3xl font-bold text-primary-500">${balance.toFixed(2)}</p>
          <button className="mt-4 text-primary-500 hover:text-primary-600 font-medium">
            Add Funds
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Services</h3>
          <p className="text-3xl font-bold">{services.filter(s => s.status === 'active').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Next Payment</h3>
          <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">$29.99</p>
          <p className="text-sm text-gray-500">Due in 15 days</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
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
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6 rounded-lg">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-5 rounded-lg">
        <h3 className="text-lg font-semibold">Your Services</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedService(null)}
          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Service</span>
        </motion.button>
      </div>

      {selectedService === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableServices.map((service) => (
            <motion.div
              key={service.id}
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
          ))}
        </div>
      ) : (
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
                <p className="text-gray-500">per month</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
              >
                Purchase Now
              </motion.button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
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
                <p className="text-sm text-gray-500">Expires: {new Date(service.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium"
              >
                Manage
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 border border-primary-500 hover:bg-primary-500/10 text-primary-500 rounded-lg font-medium"
              >
                Renew
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6 rounded-lg">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium">
                    {method.brand} ending in {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600">
                Remove
              </button>
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddCard(true)}
          className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Payment Method</span>
        </motion.button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium">VPS Server #1</p>
              <p className="text-sm text-gray-500">March 1, 2025</p>
            </div>
            <span className="text-red-500">-$29.99</span>
          </div>
        </div>
      </div>
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
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen account-shimmer-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white">
                    {user?.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user?.email}
                </h2>
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
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </motion.button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};