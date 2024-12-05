import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { MaintenanceStatusBadge } from './MaintenanceStatusBadge';
import type { MaintenanceRecord } from '../../../types';

type MaintenanceListProps = {
  records: MaintenanceRecord[];
  onView: (record: MaintenanceRecord) => void;
};

export function MaintenanceList({ records, onView }: MaintenanceListProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('maintenance.list.date')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('maintenance.list.type')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('maintenance.list.technician')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('maintenance.list.status')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('maintenance.list.cost')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('common.actions.view')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(record.date), 'PPP')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {t(`maintenance.types.${record.type.toLowerCase()}`)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.technician}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <MaintenanceStatusBadge status={record.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${record.cost.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onView(record)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  {t('common.actions.view')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}