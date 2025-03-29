import React from 'react';
import { Lock, Shield, Eye, Database } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Last updated: March 15, 2025
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary-500" />
              1. Information Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Account information (name, email, billing details)</li>
              <li>Service usage data</li>
              <li>Communication preferences</li>
              <li>Technical information about your devices</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary-500" />
              2. Data Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement various security measures to maintain the safety of your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Encryption of sensitive data</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Physical security measures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-primary-500" />
              3. Information Usage
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate about promotions and updates</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2 text-primary-500" />
              4. Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We retain your information for as long as your account is active or as needed to provide you services. You can request data deletion by contacting our support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};