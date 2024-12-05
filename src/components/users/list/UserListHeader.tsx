import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Users } from 'lucide-react';
import type { UserRole, UserStatus } from '../../../types/user';

type UserListHeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: UserRole | '';
  onRoleChange: (role: UserRole | '') => void;
  selectedStatus: UserStatus | '';
  onStatusChange: (status: UserStatus | '') => void;
  selectedCount: number;
  onBulkStatusUpdate: (status: UserStatus) => void;
};

export function UserListHeader({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  selectedCount,
  onBulkStatusUpdate
}: UserListHeaderProps) {
  const { t } = useTranslation();
  const [showBulkActions, setShowBulkActions] = React.useState(false);

  return (
    <div className="p-4 border-b border-gray-200 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('common.actions.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole | '')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('users.filter.allRoles')}</option>
            <option value="ADMIN">{t('users.roles.admin')}</option>
            <option value="SUPERVISOR">{t('users.roles.supervisor')}</option>
            <option value="OPERATOR">{t('users.roles.operator')}</option>
            <option value="VISITOR">{t('users.roles.visitor')}</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as UserStatus | '')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('users.filter.allStatuses')}</option>
            <option value="ACTIVE">{t('users.status.active')}</option>
            <option value="INACTIVE">{t('users.status.inactive')}</option>
            <option value="BLOCKED">{t('users.status.blocked')}</option>
          </select>

          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            {t('common.actions.filter')}
          </button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-700">
              {t('users.selection.count', { count: selectedCount })}
            </span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onBulkStatusUpdate('ACTIVE')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {t('users.actions.activate')}
            </button>
            <button
              onClick={() => onBulkStatusUpdate('INACTIVE')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              {t('users.actions.deactivate')}
            </button>
            <button
              onClick={() => onBulkStatusUpdate('BLOCKED')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              {t('users.actions.block')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}