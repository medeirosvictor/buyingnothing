import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import { LoginForm } from '@/components/auth';

function InfoRow({ label, value, fallback }: { label: string; value: string | null | undefined; fallback: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-0.5">
        {label}
      </dt>
      <dd className={`text-sm ${value ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-500 italic'}`}>
        {value || fallback}
      </dd>
    </div>
  );
}

export function ProfilePage() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const dialog = useDialog();

  if (!isAuthenticated) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-4">
          {t('profile.title')}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">
          {t('auth.noAccount')}
        </p>
        <button
          onClick={() => dialog.open(<LoginForm />)}
          className="px-8 py-3 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors"
        >
          {t('auth.loginTitle')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* User profile card */}
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6 mb-10">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 flex-shrink-0 bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-600 text-center leading-tight">
              {t('profile.noProfileImage')}
            </span>
          </div>

          {/* Info grid */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
            <InfoRow label={t('profile.name')} value={user?.full_name} fallback={t('profile.notProvided')} />
            <InfoRow label={t('profile.email')} value={user?.email} fallback={t('profile.notProvided')} />
            <InfoRow label={t('profile.neighborhood')} value={user?.neighborhood} fallback={t('profile.notProvided')} />
            <InfoRow label={t('profile.phone')} value={null} fallback={t('profile.notProvided')} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t-2 border-stone-200 dark:border-stone-800">
          <button className="px-5 py-2 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors">
            {t('profile.editProfile')}
          </button>
          <button className="px-5 py-2 border-2 border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-widest hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors">
            {t('profile.deleteAccount')}
          </button>
        </div>
      </div>

      {/* Donations sections */}
      <h2 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-6">
        {t('donation.myDonations')}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6">
          <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 mb-4">
            {t('donation.received')}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t('donation.noDonations')}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6">
          <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 mb-4">
            {t('donation.given')}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t('donation.noDonations')}
          </p>
        </div>
      </div>
    </div>
  );
}
