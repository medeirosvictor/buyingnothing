import { useTranslation } from 'react-i18next';
import { Map } from '@/components/Map';

export function ItemsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
          {t('item.availableItems')}
        </h1>
        <button className="px-5 py-2 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors">
          {t('item.postItem')}
        </button>
      </div>

      <div className="mb-10 border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
        <Map
          height="300px"
          markers={[
            {
              position: [-3.7172, -38.5433],
              title: 'Fortaleza',
              description: 'Center of Fortaleza',
            },
            {
              position: [-3.7305, -38.5217],
              title: 'Aldeota',
              description: 'Shopping Aldeota',
            },
          ]}
        />
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-10 text-center">
        <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          {t('item.noItems')}
        </p>
      </div>
    </div>
  );
}
