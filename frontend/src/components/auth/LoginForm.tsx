import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';

type Mode = 'login' | 'signup';

export function LoginForm() {
  const { t } = useTranslation();
  const { login, signup } = useAuth();
  const dialog = useDialog();

  const [mode, setMode] = useState<Mode>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup({ email, username, password, full_name: fullName || undefined });
      }
      dialog.close();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-moss-500 focus:outline-none transition-colors';

  return (
    <div className="bg-stone-50 dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-100 p-6 rounded-sm">
      <h2 className="text-lg font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-6">
        {mode === 'login' ? t('auth.loginTitle') : t('auth.signupTitle')}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder={t('auth.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="text"
              placeholder={t('auth.fullName')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </>
        )}

        <input
          type="email"
          placeholder={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="password"
          placeholder={t('auth.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClass}
        />

        {error && (
          <p className="text-xs text-red-500 uppercase tracking-wider">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 disabled:opacity-50 transition-colors"
        >
          {loading
            ? t('common.loading')
            : mode === 'login'
              ? t('auth.loginTitle')
              : t('auth.signupTitle')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setError('');
          }}
          className="text-xs text-stone-500 dark:text-stone-400 hover:text-moss-500 dark:hover:text-moss-400 transition-colors"
        >
          {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
        </button>
      </div>
    </div>
  );
}
