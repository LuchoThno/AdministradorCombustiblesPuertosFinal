import React from 'react';
import { hashPassword } from '../utils/auth';
import { idGenerator } from '../utils/idGenerator';
import type { User, UserAuditLog, UserRole, UserStatus } from '../types/user';

interface UserContextType {
  users: User[];
  auditLogs: UserAuditLog[];
  addUser: (data: Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts'>) => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  searchUsers: (query: string) => User[];
  filterUsers: (role?: UserRole, status?: UserStatus) => User[];
  bulkUpdateStatus: (ids: string[], status: UserStatus) => void;
  addAuditLog: (log: Omit<UserAuditLog, 'id' | 'timestamp'>) => void;
  getUserAuditLogs: (userId: string) => UserAuditLog[];
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [auditLogs, setAuditLogs] = React.useState<UserAuditLog[]>([]);

  // Load saved data on mount
  React.useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedLogs = localStorage.getItem('auditLogs');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedLogs) {
      setAuditLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save data on changes
  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  React.useEffect(() => {
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addUser = async (data: Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'failedLoginAttempts'>) => {
    const hashedPassword = data.password ? await hashPassword(data.password) : undefined;
    
    const newUser: User = {
      ...data,
      id: crypto.randomUUID(),
      userId: idGenerator.generateUserId(),
      password: hashedPassword,
      failedLoginAttempts: 0,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setUsers(prev => [newUser, ...prev]);
    addAuditLog({
      userId: newUser.id,
      action: 'CREATE',
      details: `User ${newUser.username} created`,
      performedBy: 'system'
    });
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, ...data, updatedAt: new Date() }
          : user
      )
    );
    addAuditLog({
      userId: id,
      action: 'UPDATE',
      details: `User details updated`,
      performedBy: 'system'
    });
  };

  const deleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUsers(prev => prev.filter(u => u.id !== id));
      addAuditLog({
        userId: id,
        action: 'DELETE',
        details: `User ${user.username} deleted`,
        performedBy: 'system'
      });
    }
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const searchUsers = (query: string) => {
    const searchTerm = query.toLowerCase();
    return users.filter(user =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.fullName.toLowerCase().includes(searchTerm) ||
      user.userId.toLowerCase().includes(searchTerm)
    );
  };

  const filterUsers = (role?: UserRole, status?: UserStatus) => {
    return users.filter(user =>
      (!role || user.role === role) &&
      (!status || user.status === status)
    );
  };

  const bulkUpdateStatus = (ids: string[], status: UserStatus) => {
    setUsers(prev =>
      prev.map(user =>
        ids.includes(user.id)
          ? { ...user, status, updatedAt: new Date() }
          : user
      )
    );
    ids.forEach(id => {
      addAuditLog({
        userId: id,
        action: 'STATUS_CHANGE',
        details: `User status changed to ${status}`,
        performedBy: 'system'
      });
    });
  };

  const addAuditLog = (log: Omit<UserAuditLog, 'id' | 'timestamp'>) => {
    const newLog: UserAuditLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const getUserAuditLogs = (userId: string) => {
    return auditLogs.filter(log => log.userId === userId);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        auditLogs,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        searchUsers,
        filterUsers,
        bulkUpdateStatus,
        addAuditLog,
        getUserAuditLogs
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}