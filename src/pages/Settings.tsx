import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

type SettingsState = {
  notifications: {
    email: boolean;
    browser: boolean;
    maintenance: boolean;
    documents: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };
  system: {
    autoLogout: number;
    sessionTimeout: number;
  };
};

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [settings, setSettings] = React.useState<SettingsState>({
    notifications: {
      email: true,
      browser: true,
      maintenance: true,
      documents: true,
    },
    display: {
      theme: 'light',
      language: i18n.language,
      timezone: 'UTC',
    },
    system: {
      autoLogout: 30,
      sessionTimeout: 60,
    }
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Save settings to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Apply language change
      if (settings.display.language !== i18n.language) {
        await i18n.changeLanguage(settings.display.language);
      }

      setSaveMessage(t('settings.saveSuccess'));
    } catch (error) {
      setSaveMessage(t('settings.saveError'));
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      }
    }));
  };

  const handleDisplayChange = (key: keyof typeof settings.display, value: string) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value,
      }
    }));
  };

  const handleSystemChange = (key: keyof typeof settings.system, value: number) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value,
      }
    }));
  };

  // Load saved settings on component mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon className="mr-2" /> {t('settings.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Notifications Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.notifications.title')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {t('settings.notifications.email')}
              </label>
              <button
                type="button"
                onClick={() => handleNotificationChange('email')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {t('settings.notifications.browser')}
              </label>
              <button
                type="button"
                onClick={() => handleNotificationChange('browser')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.notifications.browser ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.notifications.browser ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.display.title')}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.display.theme')}
              </label>
              <select
                value={settings.display.theme}
                onChange={(e) => handleDisplayChange('theme', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="light">{t('settings.display.themes.light')}</option>
                <option value="dark">{t('settings.display.themes.dark')}</option>
                <option value="system">{t('settings.display.themes.system')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.display.language')}
              </label>
              <select
                value={settings.display.language}
                onChange={(e) => handleDisplayChange('language', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.system.title')}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.system.autoLogout')}
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={settings.system.autoLogout}
                onChange={(e) => handleSystemChange('autoLogout', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('settings.system.sessionTimeout')}
              </label>
              <input
                type="number"
                min="1"
                max="240"
                value={settings.system.sessionTimeout}
                onChange={(e) => handleSystemChange('sessionTimeout', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Save Button and Message */}
        <div className="flex justify-between items-center">
          {saveMessage && (
            <p className={`text-sm ${
              saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
            }`}>
              {saveMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? t('settings.saving') : t('settings.save')}
          </button>
        </div>
      </form>
    </div>
  );
}