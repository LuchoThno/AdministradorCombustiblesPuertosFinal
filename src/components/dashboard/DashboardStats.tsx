import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFuel } from '../../contexts/FuelContext';
import { useEquipment } from '../../contexts/EquipmentContext';
import { DashboardCard } from './DashboardCard';
import { ConsumptionChart } from './ConsumptionChart';
import { FuelDistributionChart } from './FuelDistributionChart';
import { Droplet, Truck, FileText } from 'lucide-react';
import { format } from 'date-fns';

export function DashboardStats() {
  const { t } = useTranslation();
  const { records } = useFuel();
  const { equipments } = useEquipment();

  const stats = React.useMemo(() => {
    const totalDiesel = records
      .filter(r => r.fuelType === 'DIESEL')
      .reduce((acc, curr) => acc + curr.quantity, 0);

    const totalGas = records
      .filter(r => r.fuelType === 'GAS')
      .reduce((acc, curr) => acc + curr.quantity, 0);

    const totalMachines = equipments.length;

    const activeEquipment = equipments.filter(eq => eq.status === 'ACTIVE').length;
    const maintenanceEquipment = equipments.filter(eq => eq.status === 'MAINTENANCE').length;

    const expiringDocuments = equipments.reduce((acc, equipment) => {
      const expiring = equipment.documents.filter(doc => {
        if (!doc.expiryDate) return false;
        const daysUntilExpiry = Math.ceil(
          (new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      });
      return acc + expiring.length;
    }, 0);

    return {
      totalDiesel,
      totalGas,
      totalMachines,
      activeEquipment,
      maintenanceEquipment,
      expiringDocuments
    };
  }, [records, equipments]);

  const recentDocuments = React.useMemo(() => {
    const allDocs = equipments.flatMap(equipment => 
      equipment.documents.map(doc => ({
        ...doc,
        equipmentId: equipment.equipmentId,
        equipmentType: equipment.type
      }))
    );
    
    return allDocs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [equipments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title={t('fuel.types.diesel')}
          value={`${stats.totalDiesel.toFixed(2)} L`}
          icon={Droplet}
          color="blue"
        />
        <DashboardCard
          title={t('fuel.types.gas')}
          value={`${stats.totalGas.toFixed(2)} L`}
          icon={Droplet}
          color="green"
        />
        <DashboardCard
          title={t('equipment.title')}
          value={`${stats.activeEquipment}/${stats.totalMachines}`}
          subtitle={`${stats.maintenanceEquipment} ${t('equipment.status.maintenance').toLowerCase()}`}
          icon={Truck}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.consumptionByMachine')}
          </h3>
          <ConsumptionChart records={records} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.fuelDistribution')}
          </h3>
          <FuelDistributionChart diesel={stats.totalDiesel} gas={stats.totalGas} />
        </div>

        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('dashboard.recentDocuments')}
            </h3>
            {stats.expiringDocuments > 0 && (
              <span className="px-2 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                {stats.expiringDocuments} {t('dashboard.expiringDocuments')}
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('documents.form.type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('documents.form.number')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('documents.form.issueDate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('equipment.form.id')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-900">
                          {t(`documents.types.${doc.type.toLowerCase()}`)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(doc.issueDate), 'PP')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doc.equipmentId}</div>
                      <div className="text-sm text-gray-500">
                        {t(`equipment.types.${doc.equipmentType.toLowerCase()}`)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}