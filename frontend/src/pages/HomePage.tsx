import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 leading-[0.95]">
            {t('home.title')}
          </h2>
          <p className="mt-6 text-lg text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <button className="px-8 py-3 bg-moss-500 text-white font-bold text-sm uppercase tracking-widest hover:bg-moss-600 transition-colors">
              {t('home.startNow')}
            </button>
            <Link
              to="/items"
              className="px-8 py-3 border-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 font-bold text-sm uppercase tracking-widest hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors inline-block"
            >
              {t('home.browseItems')}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 text-center mb-12">
          {t('home.howItWorks')}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[t('home.step1'), t('home.step2'), t('home.step3')].map((step, i) => (
            <div key={i} className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800">
              <span className="text-4xl font-black text-moss-300 dark:text-moss-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
