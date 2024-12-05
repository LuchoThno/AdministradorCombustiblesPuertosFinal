import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Users, User, Eye } from 'lucide-react';
import type { UserRole } from '../../../types/user';

type UserRoleBadgeProps = {
  role: UserRole;
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const { t } = useTranslation();

  const getRoleConfig = () => {
    switch (role) {
      case 'ADMIN':
        return {
          icon: Shield,
          classes: 'bg-purple-100 text-purple-800',
          label: t('users.roles.admin')
        };
      case 'SUPERVISOR':
        return {
          icon: Users,
          classes: 'bg-blue-100 text-blue-800',
          label: t('users.roles.supervisor')
        };
      case 'OPERATOR':
        return {
          icon: User,
          classes: 'bg-green-100 text-green-800',
          label: t('users.roles.operator')
        };
      case 'VISITOR':
        return {
          icon: Eye,
          classes: 'bg-gray-100 text-gray-800',
          label: t('users.roles.visitor')
        };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.label}
    </span>
  );
}