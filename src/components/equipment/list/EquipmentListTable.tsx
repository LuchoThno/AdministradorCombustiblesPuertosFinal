import React from 'react';
import { useTranslation } from 'react-i18next';
import { EquipmentTableHeader } from './EquipmentTableHeader';
import { EquipmentTableRow } from './EquipmentTableRow';
import type { Equipment } from '../../../types';

type EquipmentListTableProps = {
  equipments: Equipment[];
  onView: (equipment: Equipment) => void;
};

export function EquipmentListTable({ equipments, onView }: EquipmentListTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <EquipmentTableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {equipments.map((equipment) => (
            <EquipmentTableRow
              key={equipment.id}
              equipment={equipment}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}