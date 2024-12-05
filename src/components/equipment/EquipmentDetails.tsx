import React from 'react';
import { format } from 'date-fns';
import { X, Tool, Calendar, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Equipment } from '../../types';

type EquipmentDetailsProps = {
  equipment: Equipment;
  onClose: () => void;
};

export default function EquipmentDetails({ equipment, onClose }: EquipmentDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{t('equipment.title')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t('equipment.form.title')}</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.type')}</dt>
                <dd className="text-sm text-gray-900">{t(`equipment.types.${equipment.type.toLowerCase()}`)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.brand')}</dt>
                <dd className="text-sm text-gray-900">{equipment.brand}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.model')}</dt>
                <dd className="text-sm text-gray-900">{equipment.model}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.serialNumber')}</dt>
                <dd className="text-sm text-gray-900">{equipment.serialNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.year')}</dt>
                <dd className="text-sm text-gray-900">{equipment.year}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.status')}</dt>
                <dd className="text-sm text-gray-900">{t(`equipment.status.${equipment.status.toLowerCase()}`)}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t('equipment.maintenance.title')}</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.lastMaintenance')}</dt>
                <dd className="text-sm text-gray-900">
                  {equipment.lastMaintenance ? format(new Date(equipment.lastMaintenance), 'PPP') : t('common.notAvailable')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('equipment.form.nextMaintenance')}</dt>
                <dd className="text-sm text-gray-900">
                  {equipment.nextMaintenance ? format(new Date(equipment.nextMaintenance), 'PPP') : t('common.notAvailable')}
                </dd>
              </div>
            </dl>

            <h4 className="font-semibold text-gray-700 mt-4 mb-2">{t('equipment.form.notes')}</h4>
            <p className="text-sm text-gray-900">{equipment.notes || t('common.noNotes')}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">{t('documents.title')}</h4>
          {equipment.documents.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {equipment.documents.map((doc) => (
                <li key={doc.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {t(`documents.types.${doc.type.toLowerCase()}`)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(doc.issueDate), 'PP')}
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                    {t('common.actions.view')}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">{t('documents.noDocuments')}</p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {t('common.actions.close')}
          </button>
        </div>
      </div>
    </div>
  );
}