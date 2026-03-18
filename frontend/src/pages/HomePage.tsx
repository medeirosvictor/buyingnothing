import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-gray-50 dark:from-green-900/20 dark:to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('home.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              {t('home.startNow')}
            </button>
            <Link
              to="/items"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-green-600 border border-green-600 dark:border-green-400 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-gray-700 transition-colors inline-block"
            >
              {t('home.browseItems')}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('home.howItWorks')}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <p className="text-gray-600 dark:text-gray-300">{t('home.step1')}</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <p className="text-gray-600 dark:text-gray-300">{t('home.step2')}</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <p className="text-gray-600 dark:text-gray-300">{t('home.step3')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
