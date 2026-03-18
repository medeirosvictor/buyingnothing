import { useTranslation } from 'react-i18next';
import { Map } from '../components/Map';

export function ItemsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('item.availableItems')}
        </h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          {t('item.postItem')}
        </button>
      </div>

      {/* Map showing available items location */}
      <div className="mb-8">
        <Map
          height="300px"
          markers={[
            {
              position: [-3.7172, -38.5433],
              title: 'Fortaleza',
              description: 'Center of Fortaleza'
            },
            {
              position: [-3.7305, -38.5217],
              title: 'Aldeota',
              description: 'Shopping Aldeota'
            }
          ]}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">{t('item.noItems')}</p>
      </div>
    </div>
  );
}
