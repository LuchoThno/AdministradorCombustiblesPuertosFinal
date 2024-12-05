import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardStats } from '../components/dashboard/DashboardStats';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('navigation.dashboard')}</h1>
      <DashboardStats />
    </div>
  );
}