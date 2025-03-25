import React from 'react';
import { Server, Shield, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const HostingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Virtual Hosting Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fast, secure, and reliable hosting solutions for your websites and applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Server className="h-8 w-8" />}
            title="SSD Storage"
            description="Lightning-fast SSD storage for optimal performance"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="DDoS Protection"
            description="Advanced protection against DDoS attacks"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="99.9% Uptime"
            description="Guaranteed uptime for your services"
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="24/7 Support"
            description="Round-the-clock technical support"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SpecCard title="Server Location" value="Europe" />
            <SpecCard title="Control Panel" value="cPanel/ISPmanager" />
            <SpecCard title="Backup" value="Daily Backups" />
            <SpecCard title="PHP Versions" value="5.6 - 8.2" />
            <SpecCard title="Databases" value="MySQL/PostgreSQL" />
            <SpecCard title="SSL Certificates" value="Free Let's Encrypt" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
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

const SpecCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400">{value}</p>
  </div>
);