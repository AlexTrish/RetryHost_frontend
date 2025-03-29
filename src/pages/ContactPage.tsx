import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of the following channels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <ContactCard
                icon={<Mail />}
                title="Email"
                content="support@retry.host"
                link="mailto:support@retry.host"
              />
              <ContactCard
                icon={<Phone />}
                title="Phone"
                content="+1 (555) 123-4567"
                link="tel:+15551234567"
              />
              <ContactCard
                icon={<MapPin />}
                title="Address"
                content="123 Hosting Street, Server City, 12345"
              />
              <ContactCard
                icon={<MessageSquare />}
                title="Live Chat"
                content="Available 24/7"
                link="#"
                action="Start Chat"
              />
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, content, link, action }) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
    <div className="flex items-start space-x-4">
      <div className="text-primary-500">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{content}</p>
        {link && (
          <motion.a
            href={link}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-primary-500 hover:text-primary-600 font-medium inline-block mt-2"
          >
            {action || 'Contact Us'}
          </motion.a>
        )}
      </div>
    </div>
  </div>
);