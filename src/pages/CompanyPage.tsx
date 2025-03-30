import React from 'react';
import { Building2, Users2, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CompanyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('companypage.about')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('companypage.slogan')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('companypage.company.about')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('companypage.company.info1')}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
            {t('companypage.company.info2')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">1000+</p>
              <p className="text-gray-600 dark:text-gray-400">{t('companypage.company.card1')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">500+</p>
              <p className="text-gray-600 dark:text-gray-400">{t('companypage.company.card2')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">24/7</p>
              <p className="text-gray-600 dark:text-gray-400">{t('companypage.company.card3')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">3+</p>
              <p className="text-gray-600 dark:text-gray-400">{t('companypage.company.card4')}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ValueCard
            icon={<Users2 className="h-8 w-8" />}
            title={t('companypage.cards.customer.headline')}
            description={t('companypage.cards.customer.info')}
          />
          <ValueCard
            icon={<Target className="h-8 w-8" />}
            title={t('companypage.cards.innovation.headline')}
            description={t('companypage.cards.innovation.info')}
          />
          <ValueCard
            icon={<Building2 className="h-8 w-8" />}
            title={t('companypage.cards.reliability.headline')}
            description={t('companypage.cards.reliability.info')}
          />
          <ValueCard
            icon={<Award className="h-8 w-8" />}
            title={t('companypage.cards.quality.headline')}
            description={t('companypage.cards.quality.info')}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('companypage.news')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* news */}
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <div className="text-primary-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="text-center">
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600 dark:text-gray-400">{role}</p>
  </div>
);