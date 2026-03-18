import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            <h1 className="text-xl font-bold text-gray-900">Buy Nothing</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900">{t('nav.home')}</a>
            <a href="/items" className="text-gray-600 hover:text-gray-900">{t('nav.items')}</a>
            <a href="/donations" className="text-gray-600 hover:text-gray-900">{t('nav.donations')}</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="bg-gradient-to-b from-green-50 to-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                {t('home.startNow')}
              </button>
              <button className="px-8 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                {t('home.browseItems')}
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            {t('home.howItWorks')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <p className="text-gray-600">{t('home.step1')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <p className="text-gray-600">{t('home.step2')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <p className="text-gray-600">{t('home.step3')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">{t('footer.tagline')}</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/about" className="hover:text-white">{t('footer.about')}</a>
            <a href="/contact" className="hover:text-white">{t('footer.contact')}</a>
            <a href="/terms" className="hover:text-white">{t('footer.terms')}</a>
            <a href="/privacy" className="hover:text-white">{t('footer.privacy')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;