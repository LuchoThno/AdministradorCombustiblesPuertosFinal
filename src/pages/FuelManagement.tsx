import React from 'react';
import { Fuel, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FuelForm from '../components/fuel/FuelForm';
import FuelTable from '../components/fuel/FuelTable';
import { useFuel } from '../contexts/FuelContext';

export default function FuelManagement() {
  const { t } = useTranslation();
  const { records, addRecord, exportRecords } = useFuel();
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (data: any) => {
    addRecord(data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Fuel className="mr-2" /> {t('fuel.title')}
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? t('common.actions.cancel') : t('fuel.form.title')}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <FuelForm onSubmit={handleSubmit} />
        </div>
      )}

      <FuelTable records={records} onExport={exportRecords} />
    </div>
  );
}