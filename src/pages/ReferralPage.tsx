import React from 'react';
import { Users, Gift, Share2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReferralPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Referral Program
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Earn rewards by inviting friends to RetryHost
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Invite Friends"
            description="Share your unique referral link with friends"
          />
          <FeatureCard
            icon={<Gift className="h-8 w-8" />}
            title="They Get Rewards"
            description="Your friends get a welcome bonus"
          />
          <FeatureCard
            icon={<DollarSign className="h-8 w-8" />}
            title="You Earn"
            description="Earn 20% of their first payment"
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8" />}
            title="No Limits"
            description="Invite as many friends as you want"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Your Referral Link</h2>
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                value="https://retry.host/ref/your-unique-code"
                readOnly
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
              >
                Copy Link
              </motion.button>
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-semibold flex items-center"
              >
                Share on Twitter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-semibold flex items-center"
              >
                Share on Facebook
              </motion.button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Your Referral Stats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Referrals</h3>
              <p className="text-3xl font-bold text-primary-500">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Referrals</h3>
              <p className="text-3xl font-bold text-primary-500">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-primary-500">$0.00</p>
            </div>
          </div>
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