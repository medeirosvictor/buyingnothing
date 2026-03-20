import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

export function Footer() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-500 py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs tracking-[0.15em] uppercase font-medium">
          {t('footer.tagline')}
        </p>

        <div className="flex items-center gap-6 text-xs tracking-wider uppercase">
          <Link to="/about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            {t('footer.about')}
          </Link>
          <Link to="/contact" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            {t('footer.contact')}
          </Link>
          <Link to="/terms" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            {t('footer.terms')} & {t('footer.privacy')}
          </Link>
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs tracking-wider uppercase text-stone-600 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
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
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </footer>
  );
}
