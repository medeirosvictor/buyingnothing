import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { t } = useTranslation();

  const sectionTitle = 'text-xs tracking-[0.3em] uppercase font-bold text-moss-500 dark:text-moss-400 mt-12 mb-4';
  const paragraph = 'text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-3';

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-2">
        {t('terms.title')}
      </h1>
      <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-12">
        {t('terms.lastUpdated')}
      </p>

      {/* What this is */}
      <h2 className={sectionTitle}>{t('terms.whatIsThis')}</h2>
      <p className={paragraph}>{t('terms.whatIsThisText1')}</p>
      <p className={paragraph}>{t('terms.whatIsThisText2')}</p>

      {/* How it works */}
      <h2 className={sectionTitle}>{t('terms.howItWorks')}</h2>
      <p className={paragraph}>{t('terms.howItWorksText1')}</p>
      <p className={paragraph}>{t('terms.howItWorksText2')}</p>

      {/* Your responsibility */}
      <h2 className={sectionTitle}>{t('terms.responsibility')}</h2>
      <p className={paragraph}>{t('terms.responsibilityText1')}</p>
      <p className={paragraph}>{t('terms.responsibilityText2')}</p>

      {/* No guarantees */}
      <h2 className={sectionTitle}>{t('terms.noGuarantees')}</h2>
      <p className={paragraph}>{t('terms.noGuaranteesText1')}</p>
      <p className={paragraph}>{t('terms.noGuaranteesText2')}</p>

      {/* Divider */}
      <div className="border-t-2 border-stone-200 dark:border-stone-800 mt-16 pt-12">
        <h1 className="text-3xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100 mb-8">
          {t('privacy.title')}
        </h1>

        {/* What we collect */}
        <h2 className={sectionTitle}>{t('privacy.whatWeCollect')}</h2>
        <p className={paragraph}>{t('privacy.whatWeCollectText1')}</p>
        <p className={paragraph}>{t('privacy.whatWeCollectText2')}</p>

        {/* How we use it */}
        <h2 className={sectionTitle}>{t('privacy.howWeUseIt')}</h2>
        <p className={paragraph}>{t('privacy.howWeUseItText1')}</p>
        <p className={paragraph}>{t('privacy.howWeUseItText2')}</p>

        {/* What we don't do */}
        <h2 className={sectionTitle}>{t('privacy.whatWeDontDo')}</h2>
        <p className={paragraph}>{t('privacy.whatWeDontDoText')}</p>

        {/* Your data */}
        <h2 className={sectionTitle}>{t('privacy.yourData')}</h2>
        <p className={paragraph}>{t('privacy.yourDataText')}</p>
      </div>
    </div>
  );
}
