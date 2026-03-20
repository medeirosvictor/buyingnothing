import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
        {t('about.title')}
      </h1>

      <div className="mt-8 space-y-6 text-stone-600 dark:text-stone-400 leading-relaxed">
        <p>{t('about.description1')}</p>
        <p>{t('about.description2')}</p>
        <p>{t('about.description3')}</p>
      </div>
    </div>
  );
}
