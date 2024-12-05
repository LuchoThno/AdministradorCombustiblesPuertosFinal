import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusIcon } from '../shared/StatusIcon';
import { MaintenanceStatus } from '../shared/MaintenanceStatus';
import type { Equipment } from '../../../types';

type EquipmentTableRowProps = {
  equipment: Equipment;
  onView: (equipment: Equipment) => void;
};

export function EquipmentTableRow({ equipment, onView }: EquipmentTableRowProps) {
  const { t } = useTranslation();

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusIcon status={equipment.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {equipment.equipmentId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {t(`equipment.types.${equipment.type.toLowerCase()}`)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{equipment.brand}</div>
        <div className="text-sm text-gray-500">{equipment.model}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {equipment.serialNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <MaintenanceStatus nextMaintenance={equipment.nextMaintenance} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onView(equipment)}
          className="text-blue-600 hover:text-blue-900"
        >
          {t('equipment.actions.viewDetails')}
        </button>
      </td>
    </tr>
  );
}