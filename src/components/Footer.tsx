import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company.company')}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>{t('footer.company.about')}</li>
              <li>{t('footer.company.contact')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services.services')}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link to="/hosting">{t('footer.services.hosting')}</Link></li>
              <li><Link to="/vps">VPS/VDS</Link></li>
              <li><Link to="/vpn">VPN</Link></li>
              <li><Link to="/domain">{t('footer.services.domain')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support.support')}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>{t('footer.support.help')}</li>
              <li>support@retry.host</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal.legal')}</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link to="/privacy">{t('footer.legal.privacy')}</Link></li>
              <li><Link to="/terms">{t('footer.legal.terms')}</Link></li>
              <li>{t('footer.legal.security')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 RetryHost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
