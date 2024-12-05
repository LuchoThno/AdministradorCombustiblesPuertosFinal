import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Building2, Phone, MapPin, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { userSchema } from '../../types/user';
import { PasswordField } from './PasswordField';
import type { User as UserType } from '../../types/user';

type UserFormProps = {
  user?: UserType;
  onSubmit: (data: Partial<UserType>) => void;
  onCancel: () => void;
};

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      department: user.department,
      phone: user.phone,
      location: user.location
    } : undefined
  });

  const password = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <User className="inline-block w-4 h-4 mr-1" />
            {t('users.form.username')}
          </label>
          <input
            type="text"
            {...register('username')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Mail className="inline-block w-4 h-4 mr-1" />
            {t('users.form.email')}
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <User className="inline-block w-4 h-4 mr-1" />
            {t('users.form.fullName')}
          </label>
          <input
            type="text"
            {...register('fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {!user && (
          <div>
            <PasswordField
              value={password}
              onChange={(value) => setValue('password', value)}
              error={errors.password?.message}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Shield className="inline-block w-4 h-4 mr-1" />
            {t('users.form.role')}
          </label>
          <select
            {...register('role')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">{t('common.actions.select')}</option>
            <option value="ADMIN">{t('users.roles.admin')}</option>
            <option value="SUPERVISOR">{t('users.roles.supervisor')}</option>
            <option value="OPERATOR">{t('users.roles.operator')}</option>
            <option value="VISITOR">{t('users.roles.visitor')}</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Building2 className="inline-block w-4 h-4 mr-1" />
            {t('users.form.department')}
          </label>
          <input
            type="text"
            {...register('department')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Phone className="inline-block w-4 h-4 mr-1" />
            {t('users.form.phone')}
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <MapPin className="inline-block w-4 h-4 mr-1" />
            {t('users.form.location')}
          </label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
          {user ? t('common.actions.update') : t('common.actions.create')}
        </button>
      </div>
    </form>
  );
}