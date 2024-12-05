import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fuel, Droplet, User, MapPin, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fuelRecordSchema } from '../../utils/validation';
import { useEquipment } from '../../contexts/EquipmentContext';
import type { FuelRecord } from '../../types';

type FuelFormProps = {
  onSubmit: (data: Omit<FuelRecord, 'id'>) => void;
};

export default function FuelForm({ onSubmit }: FuelFormProps) {
  const { t } = useTranslation();
  const { equipments } = useEquipment();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(fuelRecordSchema),
    defaultValues: {
      timestamp: new Date().toISOString().slice(0, 16),
      fuelType: 'DIESEL',
      unit: 'LITERS'
    }
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      timestamp: new Date(data.timestamp),
      quantity: parseFloat(data.quantity)
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Fuel className="mr-2" /> {t('fuel.form.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fuel.form.datetime')}
          </label>
          <input
            type="datetime-local"
            {...register('timestamp')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.timestamp && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Droplet className="inline-block w-4 h-4 mr-1" /> {t('fuel.form.fuelType')}
          </label>
          <select
            {...register('fuelType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="DIESEL">{t('fuel.types.diesel')}</option>
            <option value="GAS">{t('fuel.types.gas')}</option>
          </select>
          {errors.fuelType && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fuel.form.machineId')}
          </label>
          <select
            {...register('machineId')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.actions.select')}</option>
            {equipments.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {t(`equipment.types.${equipment.type.toLowerCase()}`)} - {equipment.brand} {equipment.model} ({equipment.serialNumber})
              </option>
            ))}
          </select>
          {errors.machineId && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fuel.form.quantity')}
          </label>
          <div className="flex">
            <input
              type="number"
              step="0.01"
              {...register('quantity', { valueAsNumber: true })}
              placeholder={t('fuel.form.quantity')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              {...register('unit')}
              className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="LITERS">{t('fuel.units.liters')}</option>
              <option value="GALLONS">{t('fuel.units.gallons')}</option>
            </select>
          </div>
          {errors.quantity && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="inline-block w-4 h-4 mr-1" /> {t('fuel.form.operator')}
          </label>
          <input
            type="text"
            {...register('operator')}
            placeholder={t('fuel.form.operator')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.operator && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block w-4 h-4 mr-1" /> {t('fuel.form.location')}
          </label>
          <input
            type="text"
            {...register('location')}
            placeholder={t('fuel.form.location')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline-block w-4 h-4 mr-1" /> {t('fuel.form.notes')}
          </label>
          <textarea
            {...register('notes')}
            placeholder={t('fuel.form.notesPlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
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