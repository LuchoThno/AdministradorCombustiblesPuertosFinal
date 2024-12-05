import React from 'react';
import { Users as UsersIcon, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import type { User, UserStatus } from '../types/user';

export default function Users() {
  const { t } = useTranslation();
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    bulkUpdateStatus
  } = useUser();
  
  const [showForm, setShowForm] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleSubmit = (data: Partial<User>) => {
    if (selectedUser) {
      updateUser(selectedUser.id, data);
    } else {
      addUser(data as Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts'>);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(t('users.confirmDelete'))) {
      deleteUser(user.id);
    }
  };

  const handleBulkStatusUpdate = (ids: string[], status: UserStatus) => {
    if (window.confirm(t('users.confirmBulkUpdate'))) {
      bulkUpdateStatus(ids, status);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <UsersIcon className="mr-2" /> {t('users.title')}
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t('users.actions.newUser')}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <UserForm
            user={selectedUser || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(null);
            }}
          />
        </div>
      ) : (
        <UserList
          users={users}
          onView={(user) => console.log('View user:', user)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBulkStatusUpdate={handleBulkStatusUpdate}
        />
      )}
    </div>
  );
}