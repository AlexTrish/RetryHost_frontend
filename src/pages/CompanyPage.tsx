import React from 'react';
import { Building2, Users2, Target, Award } from 'lucide-react';

export const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About RetryHost
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your trusted partner in web hosting and cloud solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Founded in 2025, RetryHost emerged from a simple vision: to make premium hosting services accessible to everyone. We believe in providing enterprise-grade solutions with unmatched customer support.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we serve thousands of customers worldwide, from individual developers to growing businesses, all while maintaining our commitment to quality and innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">1000+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Customers</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">99.9%</p>
              <p className="text-gray-600 dark:text-gray-400">Uptime</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">24/7</p>
              <p className="text-gray-600 dark:text-gray-400">Support</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary-500">10+</p>
              <p className="text-gray-600 dark:text-gray-400">Data Centers</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ValueCard
            icon={<Users2 className="h-8 w-8" />}
            title="Customer First"
            description="We prioritize our customers' needs above all else"
          />
          <ValueCard
            icon={<Target className="h-8 w-8" />}
            title="Innovation"
            description="Constantly improving our services and technology"
          />
          <ValueCard
            icon={<Building2 className="h-8 w-8" />}
            title="Reliability"
            description="Committed to providing stable and secure services"
          />
          <ValueCard
            icon={<Award className="h-8 w-8" />}
            title="Quality"
            description="Never compromising on the quality of our service"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember
              name="John Smith"
              role="CEO & Founder"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
            />
            <TeamMember
              name="Sarah Johnson"
              role="CTO"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
            />
            <TeamMember
              name="Michael Chen"
              role="Head of Operations"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
            />
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