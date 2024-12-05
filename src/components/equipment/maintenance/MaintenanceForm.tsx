import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wrench, Calendar, DollarSign, User, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { maintenanceSchema } from '../../../utils/validation';
import type { MaintenanceRecord, MaintenanceType } from '../../../types';

type MaintenanceFormProps = {
  equipmentId: string;
  onSubmit: (data: Omit<MaintenanceRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
};

export function MaintenanceForm({ equipmentId, onSubmit, onCancel }: MaintenanceFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      equipmentId,
      date: new Date().toISOString().slice(0, 16),
      type: 'PREVENTIVE' as MaintenanceType,
      status: 'SCHEDULED'
    }
  });

  const maintenanceTypes: Array<{ value: MaintenanceType; label: string }> = [
    { value: 'PREVENTIVE', label: t('maintenance.types.preventive') },
    { value: 'CORRECTIVE', label: t('maintenance.types.corrective') },
    { value: 'INSPECTION', label: t('maintenance.types.inspection') }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.date')}
          </label>
          <input
            type="datetime-local"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Wrench className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.type')}
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {maintenanceTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <User className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.technician')}
          </label>
          <input
            type="text"
            {...register('technician')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.technician && (
            <p className="mt-1 text-sm text-red-600">{errors.technician.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <DollarSign className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.cost')}
          </label>
          <input
            type="number"
            step="0.01"
            {...register('cost', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.cost && (
            <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            <FileText className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.description')}
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            {t('maintenance.form.nextMaintenanceDate')}
          </label>
          <input
            type="date"
            {...register('nextMaintenanceDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('maintenance.form.status')}
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="SCHEDULED">{t('maintenance.status.scheduled')}</option>
            <option value="IN_PROGRESS">{t('maintenance.status.inProgress')}</option>
            <option value="COMPLETED">{t('maintenance.status.completed')}</option>
            <option value="CANCELLED">{t('maintenance.status.cancelled')}</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {t('common.actions.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t('common.actions.save')}
        </button>
      </div>
    </form>
  );
}