import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { UserStatus } from '../../../types/user';

type UserStatusBadgeProps = {
  status: UserStatus;
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const { t } = useTranslation();

  const getStatusConfig = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          icon: CheckCircle,
          classes: 'bg-green-100 text-green-800',
          label: t('users.status.active')
        };
      case 'INACTIVE':
        return {
          icon: XCircle,
          classes: 'bg-yellow-100 text-yellow-800',
          label: t('users.status.inactive')
        };
      case 'BLOCKED':
        return {
          icon: AlertTriangle,
          classes: 'bg-red-100 text-red-800',
          label: t('users.status.blocked')
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.label}
    </span>
  );
}