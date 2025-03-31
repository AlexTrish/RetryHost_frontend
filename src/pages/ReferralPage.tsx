import React from 'react';
import { Users, Gift, DollarSign, Share2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from 'react-i18next';

export const ReferralPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Earn While You Share
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join our referral program and earn rewards for every friend you bring to RetryHost
            </p>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Share Your Link</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get your unique referral link from your account dashboard and share it with friends
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Friends Sign Up</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When your friends sign up using your link, they get a special welcome bonus
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Earn Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn 20% of their first payment and continue earning from their renewals
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Rewards Section */}
        <ScrollReveal>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Rewards Structure</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">Initial Purchase Bonus</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    20% of friend's first purchase
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    Instant credit to your account
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    No minimum purchase requirement
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">Recurring Rewards</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    10% of renewal payments
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    Lifetime commission structure
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                    Monthly payout options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Program Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <Gift className="h-8 w-8 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Welcome Bonus</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your friends get $10 credit on their first purchase
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <DollarSign className="h-8 w-8 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Earning Cap</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Unlimited earning potential with no restrictions
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <Users className="h-8 w-8 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor your referrals and earnings in real-time
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="text-center bg-primary-500 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Earning Today
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join our referral program and start earning rewards for sharing RetryHost with your network
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-primary-500 rounded-lg font-semibold"
            >
              Sign Up Now
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};