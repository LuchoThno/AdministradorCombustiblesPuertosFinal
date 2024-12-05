import React from 'react';
import type { FuelRecord } from '../types';

interface FuelContextType {
  records: FuelRecord[];
  addRecord: (record: Omit<FuelRecord, 'id'>) => void;
  exportRecords: () => void;
}

const FuelContext = React.createContext<FuelContextType | undefined>(undefined);

export function FuelProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = React.useState<FuelRecord[]>([]);

  const addRecord = (data: Omit<FuelRecord, 'id'>) => {
    const newRecord: FuelRecord = {
      ...data,
      id: crypto.randomUUID()
    };
    setRecords(prev => [newRecord, ...prev]);
  };

  const exportRecords = () => {
    const csv = [
      ['Date', 'Machine ID', 'Fuel Type', 'Quantity', 'Unit', 'Operator', 'Location', 'Notes'],
      ...records.map(record => [
        record.timestamp.toISOString(),
        record.machineId,
        record.fuelType,
        record.quantity.toString(),
        record.unit,
        record.operator,
        record.location,
        record.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fuel-records-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <FuelContext.Provider value={{ records, addRecord, exportRecords }}>
      {children}
    </FuelContext.Provider>
  );
}

export function useFuel() {
  const context = React.useContext(FuelContext);
  if (context === undefined) {
    throw new Error('useFuel must be used within a FuelProvider');
  }
  return context;
}