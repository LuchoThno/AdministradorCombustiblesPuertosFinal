import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Truck, Wrench, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { equipmentSchema } from '../../utils/validation';
import type { Equipment, EquipmentType } from '../../types';

type EquipmentFormProps = {
  onSubmit: (data: Omit<Equipment, 'id' | 'documents' | 'createdAt' | 'updatedAt'>) => void;
};

export default function EquipmentForm({ onSubmit }: EquipmentFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(equipmentSchema)
  });

  const equipmentTypes: { value: EquipmentType; label: string }[] = [
    { value: 'CRANE', label: t('equipment.types.crane') },
    { value: 'FORKLIFT', label: t('equipment.types.forklift') },
    { value: 'TRUCK', label: t('equipment.types.truck') },
    { value: 'LOADER', label: t('equipment.types.loader') },
    { value: 'OTHER', label: t('equipment.types.other') },
  ];

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Truck className="mr-2" /> {t('equipment.form.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.type')}
          </label>
          <select
            {...register('type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.actions.select')}</option>
            {equipmentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.brand')}
          </label>
          <input
            type="text"
            {...register('brand')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('equipment.form.brand')}
          />
          {errors.brand && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.model')}
          </label>
          <input
            type="text"
            {...register('model')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('equipment.form.model')}
          />
          {errors.model && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.serialNumber')}
          </label>
          <input
            type="text"
            {...register('serialNumber')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('equipment.form.serialNumber')}
          />
          {errors.serialNumber && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.year')}
          </label>
          <input
            type="number"
            {...register('year', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('equipment.form.year')}
          />
          {errors.year && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.status')}
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.actions.select')}</option>
            <option value="ACTIVE">{t('equipment.status.active')}</option>
            <option value="MAINTENANCE">{t('equipment.status.maintenance')}</option>
            <option value="RETIRED">{t('equipment.status.retired')}</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Wrench className="inline-block w-4 h-4 mr-1" /> {t('equipment.form.lastMaintenance')}
          </label>
          <input
            type="date"
            {...register('lastMaintenance')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block w-4 h-4 mr-1" /> {t('equipment.form.nextMaintenance')}
          </label>
          <input
            type="date"
            {...register('nextMaintenance')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('equipment.form.notes')}
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('documents.form.notesPlaceholder')}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => reset()}
          className="mr-4 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {t('common.actions.cancel')}
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t('common.actions.save')}
        </button>
      </div>
    </form>
  );
}