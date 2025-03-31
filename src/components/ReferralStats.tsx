import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReferralStatsProps {
  referralCode: string;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  referralLink: string;
}

export const ReferralStats: React.FC<ReferralStatsProps> = ({
  referralCode,
  totalReferrals,
  activeReferrals,
  totalEarnings,
  referralLink
}) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Your Referral Code</h3>
        <div className="flex items-center space-x-4 mb-6">
          <code className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono">
            {referralCode}
          </code>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copyToClipboard(referralCode)}
            className="p-2 text-primary-500 hover:text-primary-600"
          >
            <Copy className="h-5 w-5" />
          </motion.button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Referral Link</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copyToClipboard(referralLink)}
            className="p-2 text-primary-500 hover:text-primary-600"
          >
            <Copy className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-primary-500 hover:text-primary-600"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Referrals</h4>
          <p className="text-3xl font-bold text-primary-500">{totalReferrals}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Active Referrals</h4>
          <p className="text-3xl font-bold text-primary-500">{activeReferrals}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Earnings</h4>
          <p className="text-3xl font-bold text-primary-500">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Referrals</h3>
        <div className="space-y-4">
          {/* Add recent referrals list here when data is available */}
          <p className="text-gray-600 dark:text-gray-400">No recent referrals yet.</p>
        </div>
      </div>
    </div>
  );
};