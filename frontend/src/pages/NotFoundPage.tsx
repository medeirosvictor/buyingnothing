import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 className="text-8xl font-black text-stone-200 dark:text-stone-800">404</h1>
      <h2 className="mt-4 text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
        {t('notFound.title')}
      </h2>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
        {t('notFound.description')}
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-8 py-3 bg-moss-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-moss-600 transition-colors"
      >
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}
