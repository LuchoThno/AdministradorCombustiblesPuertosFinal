import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPasswordSchema } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import { PasswordField } from '../users/PasswordField';

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword, isLoading, error } = useAuth();

  const { handleSubmit, watch, setValue, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    
    try {
      await resetPassword(token, data.password);
      navigate('/login', { 
        replace: true,
        state: { message: t('auth.resetPassword.success') }
      });
    } catch (err) {
      console.error('Password reset failed:', err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('auth.resetPassword.invalidToken')}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t('auth.resetPassword.requestNew')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.resetPassword.newPassword')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.resetPassword.enterNew')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <PasswordField
              value={password}
              onChange={(value) => setValue('password', value)}
              error={errors.password?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.resetPassword.confirm')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setValue('confirmPassword', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? t('auth.updating') : t('auth.resetPassword.update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}