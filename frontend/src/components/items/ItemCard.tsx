import { useTranslation } from 'react-i18next';

export interface ItemCardData {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  condition: string | null;
  neighborhood: string | null;
  image_url: string | null;
  created_at: string;
  donor: {
    id: number;
    username: string;
    full_name: string | null;
  };
}

interface ItemCardProps {
  item: ItemCardData;
  active?: boolean;
  onClick?: () => void;
}

export function ItemCard({ item, active = false, onClick }: ItemCardProps) {
  const { t } = useTranslation();

  const posted = new Date(item.created_at).toLocaleDateString();

  return (
    <div
      onClick={onClick}
      className={`flex gap-4 p-4 border-2 transition-colors cursor-pointer ${
        active
          ? 'border-moss-500 bg-moss-50 dark:bg-moss-950/30'
          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
      }`}
    >
      {/* Image / fallback */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.title}
          className="w-20 h-20 object-cover flex-shrink-0 bg-stone-200 dark:bg-stone-800"
        />
      ) : (
        <div className="w-20 h-20 flex-shrink-0 bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-600 text-center leading-tight px-1">
            No image
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
          {item.neighborhood && <span>{item.neighborhood}</span>}
          <span>{item.donor.full_name ?? item.donor.username}</span>
          <span>{t('item.posted')} {posted}</span>
        </div>
      </div>
    </div>
  );
}
