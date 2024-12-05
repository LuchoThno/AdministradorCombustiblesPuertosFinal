import React from 'react';
import { X, FileText, Calendar, Truck, AlertTriangle, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDate, isExpiringSoon, isExpired } from '../../utils/date';
import { useEquipment } from '../../contexts/EquipmentContext';
import type { Document } from '../../types';

type DocumentViewerProps = {
  document: Document;
  onClose: () => void;
};

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const { t } = useTranslation();
  const { getEquipmentById } = useEquipment();
  const equipment = getEquipmentById(document.equipmentId);

  const getStatusBadge = () => {
    if (document.expiryDate) {
      if (isExpired(document.expiryDate)) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {t('documents.status.expired')}
          </span>
        );
      }
      if (isExpiringSoon(document.expiryDate)) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Calendar className="w-4 h-4 mr-1" />
            {t('documents.status.expiringSoon')}
          </span>
        );
      }
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <FileText className="w-4 h-4 mr-1" />
        {t('documents.status.active')}
      </span>
    );
  };

  const handleDownload = () => {
    if (document.fileUrl) {
      window.open(document.fileUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="mr-2" />
            {t(`documents.types.${document.type.toLowerCase()}`)}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t('documents.form.details')}</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('documents.form.number')}</dt>
                <dd className="text-sm text-gray-900">{document.number}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('documents.form.issueDate')}</dt>
                <dd className="text-sm text-gray-900">{formatDate(document.issueDate)}</dd>
              </div>
              {document.expiryDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('documents.form.expiryDate')}</dt>
                  <dd className="text-sm text-gray-900">{formatDate(document.expiryDate)}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">{t('common.actions.status')}</dt>
                <dd className="text-sm text-gray-900 mt-1">{getStatusBadge()}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t('equipment.title')}</h4>
            {equipment ? (
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('equipment.form.id')}</dt>
                  <dd className="text-sm text-gray-900">{equipment.equipmentId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('equipment.form.type')}</dt>
                  <dd className="text-sm text-gray-900">{t(`equipment.types.${equipment.type.toLowerCase()}`)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{t('equipment.form.brand')}</dt>
                  <dd className="text-sm text-gray-900">{equipment.brand} {equipment.model}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-gray-500">{t('equipment.notFound')}</p>
            )}
          </div>
        </div>

        {document.notes && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">{t('documents.form.notes')}</h4>
            <p className="text-sm text-gray-900">{document.notes}</p>
          </div>
        )}

        {document.fileUrl && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">{t('documents.form.file')}</h4>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">
                  {document.type}_{document.number}
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('documents.actions.download')}
              </button>
            </div>
          </div>
        )}

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