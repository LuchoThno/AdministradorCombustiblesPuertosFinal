import React from 'react';
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Equipment } from '../../../types';

type StatusIconProps = {
  status: Equipment['status'];
};

export function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case 'ACTIVE':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'MAINTENANCE':
      return <Wrench className="w-5 h-5 text-yellow-500" />;
    case 'RETIRED':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
  }
}