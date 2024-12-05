import React from 'react';
import { useTranslation } from 'react-i18next';

type MaintenanceStatusProps = {
  nextMaintenance?: Date;
};

export function MaintenanceStatus({ nextMaintenance }: MaintenanceStatusProps) {
  const { t } = useTranslation();

  if (!nextMaintenance) return null;

  const daysUntilMaintenance = Math.ceil(
    (new Date(nextMaintenance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilMaintenance <= 0) {
    return <span className="text-red-600 font-medium">{t('equipment.maintenance.overdue')}</span>;
  }
  if (daysUntilMaintenance <= 7) {
    return <span className="text-yellow-600 font-medium">{t('equipment.maintenance.dueSoon')}</span>;
  }
  return <span className="text-green-600 font-medium">{t('equipment.maintenance.upToDate')}</span>;
}