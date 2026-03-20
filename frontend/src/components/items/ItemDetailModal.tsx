import { useTranslation } from 'react-i18next';
import type { ItemCardData } from './ItemCard';

interface ItemDetailModalProps {
  item: ItemCardData;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const { t } = useTranslation();

  const posted = new Date(item.created_at).toLocaleDateString();

  return (
    <div className="p-6 max-w-lg w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
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

      {/* Image */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-64 object-cover bg-stone-200 dark:bg-stone-800 rounded-sm mb-6"
        />
      ) : (
        <div className="w-full h-48 bg-stone-200 dark:bg-stone-800 flex items-center justify-center rounded-sm mb-6">
          <span className="text-xs uppercase tracking-wider text-stone-400 dark:text-stone-600">
            {t('item.noImage')}
          </span>
        </div>
      )}

      {/* Details */}
      <div className="space-y-4">
        {/* Description */}
        {item.description && (
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Meta info */}
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

        {/* Location */}
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

        {/* Donor & Date */}
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

        {/* Action */}
        <button className="w-full mt-6 px-6 py-3 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors rounded-sm">
          {t('item.claimItem')}
        </button>
      </div>
    </div>
  );
}
