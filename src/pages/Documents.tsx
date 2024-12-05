import React from 'react';
import { FileText, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DocumentForm from '../components/documents/DocumentForm';
import DocumentList from '../components/documents/DocumentList';
import DocumentViewer from '../components/documents/DocumentViewer';
import { useEquipment } from '../contexts/EquipmentContext';
import type { Document } from '../types';

export default function Documents() {
  const { t } = useTranslation();
  const { equipments, addDocumentToEquipment } = useEquipment();
  const [showForm, setShowForm] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState<Document | null>(null);

  // Get all documents from all equipment
  const documents = React.useMemo(() => {
    return equipments.reduce<Document[]>((acc, equipment) => {
      return [...acc, ...equipment.documents];
    }, []);
  }, [equipments]);

  const handleSubmit = (data: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'status'>) => {
    const newDocument: Document = {
      ...data,
      id: crypto.randomUUID(),
      status: 'ACTIVE',
      createdBy: 'current-user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addDocumentToEquipment(data.equipmentId, newDocument);
    setShowForm(false);
  };

  const handleView = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-2" /> {t('documents.title')}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {showForm ? t('common.actions.cancel') : t('documents.form.title')}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            {t('common.actions.filter')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <DocumentForm onSubmit={handleSubmit} />
        </div>
      )}

      <DocumentList documents={documents} onView={handleView} />

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}