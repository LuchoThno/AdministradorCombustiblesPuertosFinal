import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type EquipmentListHeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export function EquipmentListHeader({ searchTerm, onSearchChange }: EquipmentListHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('common.actions.search')}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}