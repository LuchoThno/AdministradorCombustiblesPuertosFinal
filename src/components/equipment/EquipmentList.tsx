import React from 'react';
import { EquipmentListHeader } from './list/EquipmentListHeader';
import { EquipmentListTable } from './list/EquipmentListTable';
import type { Equipment } from '../../types';

type EquipmentListProps = {
  equipments: Equipment[];
  onView: (equipment: Equipment) => void;
};

export default function EquipmentList({ equipments, onView }: EquipmentListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredEquipments = React.useMemo(() => {
    if (!searchTerm) return equipments;
    const term = searchTerm.toLowerCase();
    return equipments.filter(equipment => 
      equipment.equipmentId.toLowerCase().includes(term) ||
      equipment.brand.toLowerCase().includes(term) ||
      equipment.model.toLowerCase().includes(term) ||
      equipment.serialNumber.toLowerCase().includes(term)
    );
  }, [equipments, searchTerm]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <EquipmentListHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <EquipmentListTable
        equipments={filteredEquipments}
        onView={onView}
      />
    </div>
  );
}