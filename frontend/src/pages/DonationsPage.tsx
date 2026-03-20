import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import { Map } from '@/components/Map';
import { ItemCard, ItemGridCard, ItemDetailModal } from '@/components/items';
import type { ItemCardData } from '@/components/items';
import type { MapMarker } from '@/components/Map';
import { AnimatedList } from '@/components/ui';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import { LoginForm } from '@/components/auth';
import { FiMap, FiGrid } from 'react-icons/fi';

type ViewMode = 'list-map' | 'grid';

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
  const [viewMode, setViewMode] = useState<ViewMode>('list-map');

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
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
            {t('item.availableItems')}
          </h1>
          <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-sm overflow-hidden">
            <button
              onClick={() => setViewMode('list-map')}
              className={`p-2 transition-colors ${
                viewMode === 'list-map'
                  ? 'bg-moss-500 text-white'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="List + Map view"
            >
              <FiMap className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors border-l border-stone-300 dark:border-stone-700 ${
                viewMode === 'grid'
                  ? 'bg-moss-500 text-white'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
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

      {/* List + Map View */}
      {viewMode === 'list-map' && (
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
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="h-[600px]">
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
                <div className="h-[320px]">
                  <ItemGridCard
                    item={item}
                    active={isSelected || activeId === item.id}
                  />
                </div>
              )}
              showGradients
              enableArrowNavigation
              displayScrollbar
              className="h-full [&>div]:grid [&>div]:grid-cols-3 [&>div]:gap-4 [&>div]:p-4"
            />
          )}
        </div>
      )}
    </div>
  );
}
