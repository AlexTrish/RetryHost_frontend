import React from 'react';
import { Lock, Shield, Eye, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('privacyPage.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('privacyPage.lastUpdated')}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary-500" />
              {t('privacyPage.sections.informationCollection.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('privacyPage.sections.informationCollection.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              {t('privacyPage.sections.informationCollection.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary-500" />
              {t('privacyPage.sections.dataProtection.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('privacyPage.sections.dataProtection.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              {t('privacyPage.sections.dataProtection.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-primary-500" />
              {t('privacyPage.sections.informationUsage.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('privacyPage.sections.informationUsage.description')}
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              {t('privacyPage.sections.informationUsage.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2 text-primary-500" />
              {t('privacyPage.sections.dataRetention.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('privacyPage.sections.dataRetention.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};