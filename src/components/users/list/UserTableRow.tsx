import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { UserStatusBadge } from '../shared/UserStatusBadge';
import { UserRoleBadge } from '../shared/UserRoleBadge';
import type { User } from '../../../types/user';

type UserTableRowProps = {
  user: User;
  selected: boolean;
  onSelect: (userId: string, checked: boolean) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserTableRow({
  user,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete
}: UserTableRowProps) {
  const { t } = useTranslation();

  return (
    <tr className={selected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={selected}
          onChange={(e) => onSelect(user.id, e.target.checked)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.userId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
        <div className="text-sm text-gray-500">{user.username}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <UserRoleBadge role={user.role} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <UserStatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.lastLogin ? format(user.lastLogin, 'PPp') : t('users.neverLoggedIn')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onView(user)}
          className="text-blue-600 hover:text-blue-900 mx-2"
          title={t('common.actions.view')}
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => onEdit(user)}
          className="text-yellow-600 hover:text-yellow-900 mx-2"
          title={t('common.actions.edit')}
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(user)}
          className="text-red-600 hover:text-red-900 mx-2"
          title={t('common.actions.delete')}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}