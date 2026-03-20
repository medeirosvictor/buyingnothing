import { useTranslation } from 'react-i18next';
import type { ItemCardData } from './ItemCard';

interface ItemGridCardProps {
  item: ItemCardData;
  active?: boolean;
  onClick?: () => void;
}

export function ItemGridCard({ item, active = false, onClick }: ItemGridCardProps) {
  const { t } = useTranslation();

  const posted = new Date(item.created_at).toLocaleDateString();

  return (
    <div
      onClick={onClick}
      className={`border-2 transition-colors cursor-pointer ${
        active
          ? 'border-moss-500 bg-moss-50 dark:bg-moss-950/30'
          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
      } rounded-sm overflow-hidden h-full flex flex-col`}
    >
      {/* Image */}
      {item.image_url ? (
        <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
          <span className="text-xs uppercase tracking-wider text-stone-400 dark:text-stone-600">
            {t('item.noImage')}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 flex-1">
            {item.description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700">
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
            {item.neighborhood && (
              <span className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-sm">
                {item.neighborhood}
              </span>
            )}
            {item.category && (
              <span className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-sm">
                {item.category}
              </span>
            )}
            {item.condition && (
              <span className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-sm">
                {item.condition}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
            <span>{item.donor.full_name ?? item.donor.username}</span>
            <span>{posted}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
