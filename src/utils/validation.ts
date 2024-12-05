import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const documentSchema = z.object({
  type: z.enum(['TRANSPORT_ORDER', 'DISPATCH_GUIDE', 'INVOICE', 'TECHNICAL_REVIEW', 'INSURANCE', 'CIRCULATION_PERMIT', 'OTHER']),
  number: z.string().min(1, 'Document number is required'),
  issueDate: z.string().transform((str) => new Date(str)),
  expiryDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  equipmentId: z.string(),
  notes: z.string().optional(),
});

export const equipmentSchema = z.object({
  type: z.enum(['CRANE', 'FORKLIFT', 'TRUCK', 'LOADER', 'OTHER']),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  year: z.number().min(1900).max(new Date().getFullYear()),
  status: z.enum(['ACTIVE', 'MAINTENANCE', 'RETIRED']),
  notes: z.string().optional(),
});

export const fuelRecordSchema = z.object({
  timestamp: z.string().transform((str) => new Date(str)),
  machineId: z.string().min(1, 'Equipment ID is required'),
  fuelType: z.enum(['DIESEL', 'GAS']),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.enum(['LITERS', 'GALLONS']),
  operator: z.string().min(1, 'Operator is required'),
  location: z.string().min(1, 'Location is required'),
  notes: z.string().optional(),
});

export const maintenanceSchema = z.object({
  equipmentId: z.string(),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE', 'INSPECTION']),
  date: z.string().transform(str => new Date(str)),
  description: z.string().min(1, 'Description is required'),
  technician: z.string().min(1, 'Technician name is required'),
  cost: z.number().min(0, 'Cost must be positive'),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  nextMaintenanceDate: z.string().optional().transform(str => str ? new Date(str) : undefined),
  notes: z.string().optional(),
});