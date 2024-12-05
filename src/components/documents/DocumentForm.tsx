import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Calendar, Hash, FileInput, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { documentSchema } from '../../utils/validation';
import { useEquipment } from '../../contexts/EquipmentContext';
import type { Document, DocumentType } from '../../types';

type DocumentFormProps = {
  onSubmit: (data: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'status'>) => void;
};

export default function DocumentForm({ onSubmit }: DocumentFormProps) {
  const { t } = useTranslation();
  const { equipments } = useEquipment();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      issueDate: new Date().toISOString().slice(0, 10),
      type: 'TRANSPORT_ORDER' as DocumentType
    }
  });

  const documentTypes: Array<{ value: DocumentType; label: string }> = [
    { value: 'TRANSPORT_ORDER', label: t('documents.types.transportOrder') },
    { value: 'DISPATCH_GUIDE', label: t('documents.types.dispatchGuide') },
    { value: 'INVOICE', label: t('documents.types.invoice') },
    { value: 'TECHNICAL_REVIEW', label: t('documents.types.technicalReview') },
    { value: 'INSURANCE', label: t('documents.types.insurance') },
    { value: 'CIRCULATION_PERMIT', label: t('documents.types.circulationPermit') },
    { value: 'OTHER', label: t('documents.types.other') }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (data: any) => {
    let fileUrl = '';
    if (selectedFile) {
      // In a real application, you would upload the file to a server
      // For this example, we'll create a local object URL
      fileUrl = URL.createObjectURL(selectedFile);
    }

    const formattedData = {
      ...data,
      issueDate: new Date(data.issueDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      fileUrl
    };

    onSubmit(formattedData);
    reset();
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> {t('documents.form.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('documents.form.type')}
          </label>
          <select
            {...register('type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Hash className="inline-block w-4 h-4 mr-1" /> {t('documents.form.number')}
          </label>
          <input
            type="text"
            {...register('number')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('documents.form.numberPlaceholder')}
          />
          {errors.number && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block w-4 h-4 mr-1" /> {t('documents.form.issueDate')}
          </label>
          <input
            type="date"
            {...register('issueDate')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.issueDate && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block w-4 h-4 mr-1" /> {t('documents.form.expiryDate')}
          </label>
          <input
            type="date"
            {...register('expiryDate')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.expiryDate && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Truck className="inline-block w-4 h-4 mr-1" /> {t('documents.form.equipment')}
          </label>
          <select
            {...register('equipmentId')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('documents.form.selectEquipment')}</option>
            {equipments.map(equipment => (
              <option key={equipment.id} value={equipment.equipmentId}>
                {equipment.equipmentId} - {t(`equipment.types.${equipment.type.toLowerCase()}`)} {equipment.brand} {equipment.model}
              </option>
            ))}
          </select>
          {errors.equipmentId && (
            <span className="text-red-500 text-sm">{t('validation.required')}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileInput className="inline-block w-4 h-4 mr-1" /> {t('documents.form.file')}
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          {selectedFile && (
            <p className="mt-1 text-sm text-gray-500">
              {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('documents.form.notes')}
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