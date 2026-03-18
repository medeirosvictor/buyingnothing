import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Buy Nothing</h1>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/items"
            className={`text-sm font-medium transition-colors ${
              isActive('/items')
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t('nav.items')}
          </Link>
          <Link
            to="/donations"
            className={`text-sm font-medium transition-colors ${
              isActive('/donations')
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t('nav.donations')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
