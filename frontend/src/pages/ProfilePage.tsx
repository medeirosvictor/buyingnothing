import { useTranslation } from 'react-i18next';

export function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-10">
        {t('donation.myDonations')}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 mb-4">
            {t('donation.received')}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t('donation.noDonations')}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6">
          <h2 className="text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 mb-4">
            {t('donation.given')}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t('donation.noDonations')}
          </p>
        </div>
      </div>
    </div>
  );
}
