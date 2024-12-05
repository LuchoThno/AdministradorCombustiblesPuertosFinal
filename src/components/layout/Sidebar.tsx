import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Fuel,
  FileText,
  Truck,
  Users,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.dashboard'), to: '/', icon: LayoutDashboard },
    { name: t('navigation.fuel'), to: '/fuel', icon: Fuel },
    { name: t('navigation.documents'), to: '/documents', icon: FileText },
    { name: t('navigation.equipment'), to: '/equipment', icon: Truck },
    { name: t('navigation.users'), to: '/users', icon: Users },
    { name: t('navigation.settings'), to: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}