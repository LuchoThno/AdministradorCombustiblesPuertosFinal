import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MaintenanceRecord } from '../../../types';

type MaintenanceStatusBadgeProps = {
  status: MaintenanceRecord['status'];
};

export function MaintenanceStatusBadge({ status }: MaintenanceStatusBadgeProps) {
  const { t } = useTranslation();

  const getStatusClasses = () => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
      {t(`maintenance.status.${status.toLowerCase()}`)}
    </span>
  );
}