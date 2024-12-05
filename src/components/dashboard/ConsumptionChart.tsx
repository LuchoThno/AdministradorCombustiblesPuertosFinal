import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FuelRecord } from '../../types';

type ConsumptionChartProps = {
  records: FuelRecord[];
};

export function ConsumptionChart({ records }: ConsumptionChartProps) {
  const consumptionByMachine = React.useMemo(() => {
    const consumption = records.reduce((acc, curr) => {
      if (!acc[curr.machineId]) {
        acc[curr.machineId] = { diesel: 0, gas: 0 };
      }
      if (curr.fuelType === 'DIESEL') {
        acc[curr.machineId].diesel += curr.quantity;
      } else {
        acc[curr.machineId].gas += curr.quantity;
      }
      return acc;
    }, {} as Record<string, { diesel: number; gas: number }>);

    return Object.entries(consumption).map(([machineId, data]) => ({
      machineId,
      ...data,
    }));
  }, [records]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={consumptionByMachine}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="machineId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="diesel" fill="#0088FE" name="Diesel" />
          <Bar dataKey="gas" fill="#00C49F" name="Gas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}