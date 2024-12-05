import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { UserTableHeader } from './UserTableHeader';
import { UserTableRow } from './UserTableRow';
import type { User } from '../../../types/user';

type UserListTableProps = {
  users: User[];
  selectedUsers: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectUser: (userId: string, checked: boolean) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserListTable({
  users,
  selectedUsers,
  onSelectAll,
  onSelectUser,
  onView,
  onEdit,
  onDelete
}: UserListTableProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <UserTableHeader
          allSelected={users.length > 0 && selectedUsers.length === users.length}
          onSelectAll={onSelectAll}
        />
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              selected={selectedUsers.includes(user.id)}
              onSelect={onSelectUser}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                {t('users.noUsers')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}