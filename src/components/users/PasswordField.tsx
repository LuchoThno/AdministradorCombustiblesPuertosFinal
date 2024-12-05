import React from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PasswordField({ value, onChange, error }: PasswordFieldProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let password = '';
    // Ensure at least one character from each set
    password += charset.uppercase.charAt(Math.floor(Math.random() * charset.uppercase.length));
    password += charset.lowercase.charAt(Math.floor(Math.random() * charset.lowercase.length));
    password += charset.numbers.charAt(Math.floor(Math.random() * charset.numbers.length));
    password += charset.symbols.charAt(Math.floor(Math.random() * charset.symbols.length));

    // Fill the rest randomly
    const allChars = Object.values(charset).join('');
    for (let i = password.length; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    onChange(password);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {t('users.form.password')}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pr-20 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={generatePassword}
            className="p-2 text-blue-600 hover:text-blue-700"
            title={t('users.form.generatePassword')}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {value && (
        <div className="mt-1">
          <PasswordStrengthIndicator password={value} />
        </div>
      )}
    </div>
  );
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  const { t } = useTranslation();
  
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score < 2) return { label: t('users.password.weak'), color: 'bg-red-500' };
    if (score < 4) return { label: t('users.password.medium'), color: 'bg-yellow-500' };
    return { label: t('users.password.strong'), color: 'bg-green-500' };
  };

  const strength = getStrength();

  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${strength.color}`} style={{ width: `${(getStrength().score / 6) * 100}%` }} />
      </div>
      <span className="text-xs text-gray-500">{strength.label}</span>
    </div>
  );
}