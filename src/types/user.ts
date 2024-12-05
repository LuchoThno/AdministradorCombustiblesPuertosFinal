import { z } from 'zod';

export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'OPERATOR' | 'VISITOR';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export type User = {
  id: string;
  userId: string; // Sequential ID (e.g., USR000001)
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  phone?: string;
  location?: string;
  lastLogin?: Date;
  failedLoginAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
};

export type UserAuditLog = {
  id: string;
  userId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'PASSWORD_CHANGE' | 'STATUS_CHANGE';
  details: string;
  performedBy: string;
  timestamp: Date;
};

export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'OPERATOR', 'VISITOR']),
  department: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const userUpdateSchema = userSchema.partial().extend({
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

export type UserPermission = {
  module: string;
  actions: {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
};

export const defaultPermissions: Record<UserRole, UserPermission[]> = {
  ADMIN: [
    {
      module: 'users',
      actions: { view: true, create: true, update: true, delete: true }
    },
    {
      module: 'equipment',
      actions: { view: true, create: true, update: true, delete: true }
    },
    {
      module: 'documents',
      actions: { view: true, create: true, update: true, delete: true }
    },
    {
      module: 'maintenance',
      actions: { view: true, create: true, update: true, delete: true }
    }
  ],
  SUPERVISOR: [
    {
      module: 'users',
      actions: { view: true, create: false, update: true, delete: false }
    },
    {
      module: 'equipment',
      actions: { view: true, create: true, update: true, delete: false }
    },
    {
      module: 'documents',
      actions: { view: true, create: true, update: true, delete: false }
    },
    {
      module: 'maintenance',
      actions: { view: true, create: true, update: true, delete: false }
    }
  ],
  OPERATOR: [
    {
      module: 'users',
      actions: { view: false, create: false, update: false, delete: false }
    },
    {
      module: 'equipment',
      actions: { view: true, create: false, update: false, delete: false }
    },
    {
      module: 'documents',
      actions: { view: true, create: true, update: false, delete: false }
    },
    {
      module: 'maintenance',
      actions: { view: true, create: true, update: false, delete: false }
    }
  ],
  VISITOR: [
    {
      module: 'users',
      actions: { view: false, create: false, update: false, delete: false }
    },
    {
      module: 'equipment',
      actions: { view: true, create: false, update: false, delete: false }
    },
    {
      module: 'documents',
      actions: { view: true, create: false, update: false, delete: false }
    },
    {
      module: 'maintenance',
      actions: { view: true, create: false, update: false, delete: false }
    }
  ]
};