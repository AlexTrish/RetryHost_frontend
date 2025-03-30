import React from 'react';
import { Globe, Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const DomainPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('domainpage.registration.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('domainpage.registration.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex gap-2 md:gap-4">
            <input
              type="text"
              placeholder={t('domainpage.registration.searchPlaceholder')}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center"
            >
              {t('domainpage.registration.searchButton')} <Search className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title={t('domainpage.features.wideSelection.title')}
            description={t('domainpage.features.wideSelection.description')}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8" />}
            title={t('domainpage.features.domainPrivacy.title')}
            description={t('domainpage.features.domainPrivacy.description')}
          />
          <FeatureCard
            icon={<ArrowRight className="h-8 w-8" />}
            title={t('domainpage.features.easyTransfer.title')}
            description={t('domainpage.features.easyTransfer.description')}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('domainpage.popularExtensions.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DomainPriceCard extension=".com" price="12.99" />
            <DomainPriceCard extension=".net" price="14.99" />
            <DomainPriceCard extension=".org" price="13.99" />
            <DomainPriceCard extension=".io" price="39.99" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('domainpage.helpSection.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('domainpage.helpSection.description')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold"
          >
            {t('domainpage.helpSection.contactSupport')}
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

const DomainPriceCard = ({ extension, price }) => (

  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-center">
    <h3 className="text-2xl font-bold mb-2">{extension}</h3>
    <p className="text-3xl font-bold text-primary-500">${price}
      <span className="text-sm text-gray-500">/year</span>
    </p>
  </div>
);
