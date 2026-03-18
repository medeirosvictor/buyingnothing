import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function NavLink({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`text-xs tracking-[0.2em] uppercase font-medium px-3 py-1 transition-colors ${
        active
          ? 'bg-moss-500 text-white dark:bg-moss-400 dark:text-stone-950'
          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-stone-50 dark:bg-stone-950 pt-8 pb-4">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
        {/* Brand */}
        <Link to="/" className="flex flex-col items-center gap-1 group">
          <span className="text-2xl font-black tracking-tight uppercase text-stone-900 dark:text-stone-100">
            Buy Nothing
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-moss-500 dark:text-moss-400 font-medium">
            Fortaleza
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" label={t('nav.home')} />
          <NavLink to="/items" label={t('nav.items')} />
          <NavLink to="/donations" label={t('nav.donations')} />
          <div className="ml-3 border-l border-stone-300 dark:border-stone-700 pl-3">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
