import React from 'react';
import { Shield, Clock, FileText, HelpCircle } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Last updated: March 15, 2025
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary-500" />
              1. Terms of Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              By accessing and using RetryHost's services, you accept and agree to be bound by the terms and conditions contained in this agreement.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              These terms apply to all visitors, users, and others who access or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary-500" />
              2. Service Level Agreement
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We strive to maintain 99.9% uptime for all our services. In case of any service interruption:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
              <li>We will notify you promptly about any scheduled maintenance</li>
              <li>Compensation will be provided according to our SLA policy</li>
              <li>24/7 support is available for critical issues</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary-500" />
              3. Account Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Keeping your contact information accurate and up-to-date</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <HelpCircle className="h-6 w-6 mr-2 text-primary-500" />
              4. Support and Resolution
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our support team is available 24/7 to assist you with any issues. Priority support is provided based on your service level:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Standard Support: Response within 24 hours</li>
              <li>Premium Support: Response within 4 hours</li>
              <li>Enterprise Support: Response within 1 hour</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};