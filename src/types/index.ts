// Fuel Management Types
export type FuelType = 'DIESEL' | 'GAS';

export type FuelRecord = {
  id: string;
  timestamp: Date;
  equipmentId: string;
  fuelType: FuelType;
  quantity: number;
  operator: string;
  unit: 'LITERS' | 'GALLONS';
  location: string;
  notes?: string;
};

// User Management Types
export type UserRole = 'ADMIN' | 'OPERATOR' | 'ANALYST';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
};

export type LoginFormData = {
  email: string;
  password: string;
};

// Document Management Types
export type DocumentType = 
  | 'TRANSPORT_ORDER' 
  | 'DISPATCH_GUIDE' 
  | 'INVOICE' 
  | 'TECHNICAL_REVIEW' 
  | 'INSURANCE' 
  | 'CIRCULATION_PERMIT' 
  | 'OTHER';

export type Document = {
  id: string;
  type: DocumentType;
  number: string;
  issueDate: Date;
  expiryDate?: Date;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  equipmentId: string;
  fileUrl?: string;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

// Equipment Management Types
export type EquipmentType = 'CRANE' | 'FORKLIFT' | 'TRUCK' | 'LOADER' | 'OTHER';

export type MaintenanceType = 'PREVENTIVE' | 'CORRECTIVE' | 'INSPECTION';

export type MaintenanceRecord = {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  date: Date;
  description: string;
  technician: string;
  cost: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  nextMaintenanceDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Equipment = {
  id: string;
  equipmentId: string; // Unique sequential ID (e.g., EQ000001)
  type: EquipmentType;
  brand: string;
  model: string;
  serialNumber: string;
  year: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'RETIRED';
  documents: Document[];
  maintenanceRecords: MaintenanceRecord[];
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};