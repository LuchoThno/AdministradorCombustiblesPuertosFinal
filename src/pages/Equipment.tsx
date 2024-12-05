import React from 'react';
import { Truck, Plus, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EquipmentForm from '../components/equipment/EquipmentForm';
import EquipmentList from '../components/equipment/EquipmentList';
import EquipmentDetails from '../components/equipment/EquipmentDetails';
import { useEquipment } from '../contexts/EquipmentContext';
import type { Equipment } from '../types';

export default function Equipment() {
  const { t } = useTranslation();
  const { equipments, addEquipment } = useEquipment();
  const [showForm, setShowForm] = React.useState(false);
  const [selectedEquipment, setSelectedEquipment] = React.useState<Equipment | null>(null);

  const handleSubmit = (data: Omit<Equipment, 'id' | 'documents' | 'createdAt' | 'updatedAt'>) => {
    addEquipment(data);
    setShowForm(false);
  };

  const handleView = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleClose = () => {
    setSelectedEquipment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Truck className="mr-2" /> {t('equipment.title')}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? t('common.actions.cancel') : t('equipment.form.title')}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            {t('common.actions.filter')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <EquipmentForm onSubmit={handleSubmit} />
        </div>
      )}

      <EquipmentList equipments={equipments} onView={handleView} />

      {selectedEquipment && (
        <EquipmentDetails equipment={selectedEquipment} onClose={handleClose} />
      )}
    </div>
  );
}