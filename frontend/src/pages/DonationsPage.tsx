import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import { Map } from '@/components/Map';
import { ItemCard, ItemDetailModal } from '@/components/items';
import type { ItemCardData } from '@/components/items';
import type { MapMarker } from '@/components/Map';
import { AnimatedList } from '@/components/ui';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import { LoginForm } from '@/components/auth';

interface ItemFromAPI extends ItemCardData {
  latitude: number | null;
  longitude: number | null;
  status: string;
  donor_id: number;
  updated_at: string;
}

export function DonationsPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const dialog = useDialog();
  const [items, setItems] = useState<ItemFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch<ItemFromAPI[]>('/items/')
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleActiveChange = useCallback(
    (index: number | null) => {
      setActiveId(index != null ? (items[index]?.id ?? null) : null);
    },
    [items],
  );

  const handleItemClick = useCallback(
    (item: ItemFromAPI) => {
      dialog.open(<ItemDetailModal item={item} onClose={() => dialog.close()} />);
    },
    [dialog],
  );

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
        <h1 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
          {t('item.availableItems')}
        </h1>
        <button
          onClick={() => {
            if (!isAuthenticated) {
              dialog.open(<LoginForm />);
            } else {
              // TODO: open post-item form
            }
          }}
          className="px-5 py-2 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors"
        >
          {t('item.postItem')}
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Item list */}
        <div
          className="w-[400px] flex-shrink-0 h-[600px]"
          style={{ '--gradient-bg': 'var(--list-gradient)' } as React.CSSProperties}
        >
          {loading && (
            <p className="text-sm text-stone-500 p-4">{t('common.loading')}</p>
          )}
          {!loading && items.length === 0 && (
            <div className="border-2 border-stone-200 dark:border-stone-800 p-10 text-center rounded-sm">
              <p className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t('item.noItems')}
              </p>
            </div>
          )}
          {!loading && items.length > 0 && (
            <AnimatedList
              items={items}
              onActiveIndexChange={handleActiveChange}
              onItemSelect={handleItemClick}
              renderItem={(item, _index, isSelected) => (
                <ItemCard
                  item={item}
                  active={isSelected || activeId === item.id}
                />
              )}
              showGradients
              enableArrowNavigation
              displayScrollbar
              className="h-full"
            />
          )}
        </div>

        {/* Map */}
        <div className="flex-1 border-2 border-stone-200 dark:border-stone-800 overflow-hidden sticky top-24 rounded-sm">
          <Map
            height="600px"
            markers={markers}
            activeMarkerId={activeId}
            scrollWheelZoom
          />
        </div>
      </div>
    </div>
  );
}
