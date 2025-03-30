import React from 'react';
import { Shield, Globe, Zap, Lock, Server, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const VPNPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Secure VPN Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fast, secure, and private internet access with our reliable VPN service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Military-Grade Encryption"
            description="Protect your data with AES-256 encryption"
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title="Global Network"
            description="Access servers in multiple countries"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="High-Speed Connection"
            description="Enjoy fast and stable connections"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">VPN Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              name="VPN France"
              price="1.99"
              features={[
                "5 Devices",
                "Any task",
                "Unlimited Bandwidth",
                "24/7 Support",
              ]}
            />
            <PlanCard
              name="VPN Netherlands"
              price="1.99"
              popular={true}
              features={[
                "5 Devices",
                "Any task",
                "Unlimited Bandwidth",
                "24/7 Support",
              ]}
            />
            <PlanCard
              name="VPN USA"
              price="1.99"
              features={[
                "5 Devices",
                "Any task",
                "Unlimited Bandwidth",
                "24/7 Support",
              ]}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Server Locations</h2>
            <div className="grid grid-cols-2 gap-4">
              <LocationCard country="Netherlands" servers="50+" />
              <LocationCard country="United States" servers="20+" />
              <LocationCard country="France" servers="15+" />
              <LocationCard country="Russia" servers="10+" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why Choose Our VPN?</h2>
            <div className="space-y-4">
              <BenefitItem
                icon={<Lock />}
                title="No-Logs Policy"
                description="We never track or store your online activity"
              />
              <BenefitItem
                icon={<Server />}
                title="Fast Servers"
                description="Optimized network for maximum speed"
              />
              <BenefitItem
                icon={<Users />}
                title="Multi-Device Support"
                description="Connect all your devices simultaneously"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Choose your plan and start browsing securely today
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
          >
            Get Protected Now
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

const PlanCard = ({ name, price, features, popular = false }) => (
  <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg ${popular ? 'ring-2 ring-primary-500' : ''}`}>
    <div className="text-center mb-6">
      {popular && (
        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-3xl font-bold text-primary-500">
        ${price}<span className="text-sm text-gray-500">/mo</span>
      </p>
    </div>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
          <Shield className="h-5 w-5 text-primary-500 mr-2" />
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
      Select Plan
    </motion.button>
  </div>
);

const LocationCard = ({ country, servers }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h4 className="font-semibold">{country}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">{servers} servers</p>
  </div>
);

const BenefitItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="text-primary-500">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);