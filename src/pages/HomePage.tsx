import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Cloud, Server, Shield, Globe, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { TestimonialSlider } from '../components/TestimonialSlider';

export const HomePage = () => {
  const { t } = useTranslation();
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 shimmer-bg"></div>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                {t('hero.title')}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="block text-primary-500"
                >
                  {t('hero.subtitle')}
                </motion.span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center"
                >
                  {t('hero.getStarted')} <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToPricing}
                  className="border border-primary-500 hover:bg-primary-500/10 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold"
                >
                  {t('hero.viewPlans')}
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={0.1}>
              <FeatureCard
                icon={<Cloud className="h-8 w-8 text-primary-500" />}
                title={t('features.virtualHosting.title')}
                description={t('features.virtualHosting.description')}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <FeatureCard
                icon={<Server className="h-8 w-8 text-primary-500" />}
                title={t('features.vps.title')}
                description={t('features.vps.description')}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-primary-500" />}
                title={t('features.security.title')}
                description={t('features.security.description')}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <FeatureCard
                icon={<Globe className="h-8 w-8 text-primary-500" />}
                title={t('features.domains.title')}
                description={t('features.domains.description')}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('pricing.title')}
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <PricingCard
                name={t('pricing.plans.starter')}
                price="15.99"
                features={[
                  "2GB RAM",
                  "20GB SSD Storage",
                  "1 CPU",
                  "250 MB/s",
                  "24/7 Priority Support",
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <PricingCard
                name={t('pricing.plans.professional')}
                price="29.99"
                popular={true}
                features={[
                  "4GB RAM",
                  "40GB SSD Storage",
                  "3 CPU",
                  "250 MB/s",
                  "24/7 Priority Support",
                ]}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <PricingCard
                name={t('pricing.plans.enterprise')}
                price="39.99"
                features={[
                  "32GB RAM",
                  "480GB SSD Storage",
                  "8 CPU",
                  "1 GB/s",
                  "24/7 Priority Support",
                  "DDoS Protection"
                ]}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="md:max-w-7xl max-w-xs mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('testimonials.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialSlider />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const PricingCard = ({ name, price, features, popular = false }) => {
  const { t } = useTranslation();
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 relative shadow-lg hover:shadow-xl transition-shadow ${popular ? 'ring-2 ring-primary-500' : ''}`}>
      {popular && (
        <span className="absolute top-0 right-0 bg-primary-500 text-sm px-3 py-1 rounded-bl-lg rounded-tr-xl">
          {t('pricing.mostPopular')}
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600 dark:text-gray-400">{t('pricing.perMonth')}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
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
        {t('pricing.getStart')}
      </motion.button>
    </div>
  );
};