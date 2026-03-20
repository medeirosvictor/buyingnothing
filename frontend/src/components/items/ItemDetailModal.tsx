import { useTranslation } from 'react-i18next';
import { ImageCarousel } from '@/components/ui';
import type { ItemCardData } from './ItemCard';

interface ItemDetailModalProps {
  item: ItemCardData;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const { t } = useTranslation();
  const posted = new Date(item.created_at).toLocaleDateString();

  // Build images array: prefer image_urls, fall back to single image_url
  const images: string[] = item.image_urls?.length
    ? item.image_urls
    : item.image_url
      ? [item.image_url]
      : [];

  return (
    <div className="bg-stone-50 dark:bg-stone-900 border-2 border-stone-900 dark:border-stone-100">
      {/* Header */}
      <div className="flex justify-between items-start p-6 pb-0">
        <h2 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 pr-4">
          {item.title}
        </h2>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image carousel */}
      <div className="mt-4">
        <ImageCarousel
          images={images}
          alt={item.title}
          height="16rem"
          fallback={
            <div className="w-full h-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider text-stone-400 dark:text-stone-600">
                {t('item.noImage')}
              </span>
            </div>
          }
        />
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {item.description && (
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-4">
          {item.category && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {t('item.category')}
              </span>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-1">
                {t(`item.categories.${item.category}`)}
              </p>
            </div>
          )}
          {item.condition && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {t('item.condition')}
              </span>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-1">
                {t(`item.conditions.${item.condition}`)}
              </p>
            </div>
          )}
        </div>

        {item.neighborhood && (
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {t('item.location')}
            </span>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-1">
              {item.neighborhood}
            </p>
          </div>
        )}

        {/* Donor & date */}
        <div className="flex items-center gap-4 pt-2 border-t border-stone-200 dark:border-stone-700">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {t('item.donor')}
            </span>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-1">
              {item.donor.full_name ?? item.donor.username}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {t('item.posted')}
            </span>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-1">
              {posted}
            </p>
          </div>
        </div>

        <button className="w-full mt-2 px-6 py-3 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors">
          {t('item.claimItem')}
        </button>
      </div>
    </div>
  );
}
