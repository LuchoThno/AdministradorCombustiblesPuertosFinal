import React from 'react';
import { useTranslation } from 'react-i18next';

type UserTableHeaderProps = {
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
};

export function UserTableHeader({ allSelected, onSelectAll }: UserTableHeaderProps) {
  const { t } = useTranslation();

  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('users.form.fullName')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('users.form.email')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('users.form.role')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('users.form.status')}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('users.form.lastLogin')}
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t('common.actions.actions')}
        </th>
      </tr>
    </thead>
  );
}