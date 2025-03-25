import React from 'react';
import { Cpu, HardDrive, Network, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const VPSPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            VPS/VDS Servers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            High-performance virtual servers with guaranteed resources and full root access
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Cpu className="h-8 w-8" />}
            title="Dedicated CPU"
            description="Guaranteed CPU cores for your applications"
          />
          <FeatureCard
            icon={<HardDrive className="h-8 w-8" />}
            title="SSD Storage"
            description="Fast NVMe SSD storage"
          />
          <FeatureCard
            icon={<Network className="h-8 w-8" />}
            title="High Bandwidth"
            description="Up to 1 Gbps network connection"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="DDoS Protection"
            description="Protected against DDoS attacks"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available Configurations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ConfigCard
              name="Basic VPS"
              specs={{
                cpu: "2 vCPU",
                ram: "2 GB RAM",
                storage: "20 GB NVMe SSD",
                bandwidth: "250 MB/s"
              }}
              price="15.99"
            />
            <ConfigCard
              name="Professional VPS"
              specs={{
                cpu: "4 vCPU",
                ram: "4 GB RAM",
                storage: "40 GB NVMe SSD",
                bandwidth: "500 MB/s"
              }}
              price="29.99"
              popular
            />
            <ConfigCard
              name="Premium VPS"
              specs={{
                cpu: "8 vCPU",
                ram: "8 GB RAM",
                storage: "80 GB NVMe SSD",
                bandwidth: "1 GB/s"
              }}
              price="49.99"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Deploy Your Server?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <div className="text-primary-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const ConfigCard = ({ name, specs, price, popular = false }) => (
  <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg ${popular ? 'ring-2 ring-primary-500' : ''}`}>
    <div className="text-center mb-4">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-3xl font-bold text-primary-500">${price}<span className="text-sm text-gray-500">/mo</span></p>
    </div>
    <div className="space-y-3">
      <p className="flex items-center text-gray-600 dark:text-gray-400">
        <Cpu className="h-5 w-5 mr-2 text-primary-500" />
        {specs.cpu}
      </p>
      <p className="flex items-center text-gray-600 dark:text-gray-400">
        <HardDrive className="h-5 w-5 mr-2 text-primary-500" />
        {specs.ram}
      </p>
      <p className="flex items-center text-gray-600 dark:text-gray-400">
        <Network className="h-5 w-5 mr-2 text-primary-500" />
        {specs.storage}
      </p>
      <p className="flex items-center text-gray-600 dark:text-gray-400">
        <Shield className="h-5 w-5 mr-2 text-primary-500" />
        {specs.bandwidth}
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold ${
        popular
          ? 'bg-primary-500 hover:bg-primary-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      Select Plan
    </motion.button>
  </div>
);