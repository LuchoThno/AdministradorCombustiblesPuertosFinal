import React from 'react';
import { idGenerator } from '../utils/idGenerator';
import type { Equipment, Document, MaintenanceRecord } from '../types';

interface EquipmentContextType {
  equipments: Equipment[];
  addEquipment: (equipment: Omit<Equipment, 'id' | 'equipmentId' | 'documents' | 'maintenanceRecords' | 'createdAt' | 'updatedAt'>) => void;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => void;
  addDocumentToEquipment: (equipmentId: string, document: Document) => void;
  addMaintenanceRecord: (equipmentId: string, record: MaintenanceRecord) => void;
  getEquipmentById: (equipmentId: string) => Equipment | undefined;
  searchEquipment: (query: string) => Equipment[];
}

const EquipmentContext = React.createContext<EquipmentContextType | undefined>(undefined);

export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [equipments, setEquipments] = React.useState<Equipment[]>([]);

  const addEquipment = (data: Omit<Equipment, 'id' | 'equipmentId' | 'documents' | 'maintenanceRecords' | 'createdAt' | 'updatedAt'>) => {
    const newEquipment: Equipment = {
      ...data,
      id: crypto.randomUUID(),
      equipmentId: idGenerator.generateId(),
      documents: [],
      maintenanceRecords: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEquipments(prev => [newEquipment, ...prev]);
  };

  const updateEquipment = (id: string, data: Partial<Equipment>) => {
    setEquipments(prev =>
      prev.map(equipment =>
        equipment.id === id
          ? { ...equipment, ...data, updatedAt: new Date() }
          : equipment
      )
    );
  };

  const addDocumentToEquipment = (equipmentId: string, document: Document) => {
    setEquipments(prev =>
      prev.map(equipment =>
        equipment.equipmentId === equipmentId
          ? {
              ...equipment,
              documents: [...equipment.documents, document],
              updatedAt: new Date()
            }
          : equipment
      )
    );
  };

  const addMaintenanceRecord = (equipmentId: string, record: MaintenanceRecord) => {
    setEquipments(prev =>
      prev.map(equipment =>
        equipment.equipmentId === equipmentId
          ? {
              ...equipment,
              maintenanceRecords: [...equipment.maintenanceRecords, record],
              lastMaintenance: record.date,
              nextMaintenance: record.nextMaintenanceDate,
              updatedAt: new Date()
            }
          : equipment
      )
    );
  };

  const getEquipmentById = (equipmentId: string) => {
    return equipments.find(eq => eq.equipmentId === equipmentId);
  };

  const searchEquipment = (query: string) => {
    const searchTerm = query.toLowerCase();
    return equipments.filter(equipment => 
      equipment.equipmentId.toLowerCase().includes(searchTerm) ||
      equipment.brand.toLowerCase().includes(searchTerm) ||
      equipment.model.toLowerCase().includes(searchTerm) ||
      equipment.serialNumber.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <EquipmentContext.Provider 
      value={{ 
        equipments, 
        addEquipment, 
        updateEquipment, 
        addDocumentToEquipment,
        addMaintenanceRecord,
        getEquipmentById,
        searchEquipment
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  const context = React.useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
}