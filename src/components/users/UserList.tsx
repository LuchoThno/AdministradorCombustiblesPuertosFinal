import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { UserListHeader } from './list/UserListHeader';
import { UserListTable } from './list/UserListTable';
import type { User, UserRole, UserStatus } from '../../types/user';

type UserListProps = {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onBulkStatusUpdate: (ids: string[], status: UserStatus) => void;
};

export default function UserList({
  users,
  onView,
  onEdit,
  onDelete,
  onBulkStatusUpdate
}: UserListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState<UserRole | ''>('');
  const [selectedStatus, setSelectedStatus] = React.useState<UserStatus | ''>('');
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const matchesSearch = !searchTerm || 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(u => u.id) : []);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    setSelectedUsers(prev =>
      checked
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <UserListHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCount={selectedUsers.length}
        onBulkStatusUpdate={(status) => {
          onBulkStatusUpdate(selectedUsers, status);
          setSelectedUsers([]);
        }}
      />
      <UserListTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectAll={handleSelectAll}
        onSelectUser={handleSelectUser}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}