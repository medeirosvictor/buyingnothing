import { useTranslation } from 'react-i18next';

export function DonationsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        {t('donation.myDonations')}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Received Donations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('donation.received')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('item.noItems')}
          </p>
        </div>

        {/* Given Donations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('donation.given')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('item.noItems')}
          </p>
        </div>
      </div>
    </div>
  );
}
