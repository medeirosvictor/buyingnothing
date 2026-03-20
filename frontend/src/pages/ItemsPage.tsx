import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Map } from '@/components/Map';
import { ItemCard } from '@/components/items';
import type { ItemCardData } from '@/components/items';
import type { MapMarker } from '@/components/Map';
import { apiFetch } from '@/lib/api';

interface ItemFromAPI extends ItemCardData {
  latitude: number | null;
  longitude: number | null;
  status: string;
  donor_id: number;
  updated_at: string;
}

export function ItemsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<ItemFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch<ItemFromAPI[]>('/items/')
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const markers: MapMarker[] = items
    .filter((i) => i.latitude != null && i.longitude != null)
    .map((i) => ({
      position: [i.latitude!, i.longitude!],
      title: i.title,
      description: i.neighborhood ?? undefined,
      id: i.id,
    }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
          {t('item.availableItems')}
        </h1>
        <button className="px-5 py-2 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors">
          {t('item.postItem')}
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Item list */}
        <div className="w-[400px] flex-shrink-0 flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
          {loading && (
            <p className="text-sm text-stone-500 p-4">{t('common.loading')}</p>
          )}
          {!loading && items.length === 0 && (
            <div className="border-2 border-stone-200 dark:border-stone-800 p-10 text-center">
              <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t('item.noItems')}
              </p>
            </div>
          )}
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              active={hoveredId === item.id}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Map */}
        <div className="flex-1 border-2 border-stone-200 dark:border-stone-800 overflow-hidden sticky top-24">
          <Map
            height="600px"
            markers={markers}
            activeMarkerId={hoveredId}
            scrollWheelZoom
          />
        </div>
      </div>
    </div>
  );
}
