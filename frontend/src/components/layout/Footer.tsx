import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 dark:text-gray-500 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Tagline */}
          <p className="text-sm">{t('footer.tagline')}</p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/about" className="hover:text-white dark:hover:text-gray-300 transition-colors">
              {t('footer.about')}
            </Link>
            <Link to="/contact" className="hover:text-white dark:hover:text-gray-300 transition-colors">
              {t('footer.contact')}
            </Link>
            <Link to="/terms" className="hover:text-white dark:hover:text-gray-300 transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="hover:text-white dark:hover:text-gray-300 transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            <span className="text-xs">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
