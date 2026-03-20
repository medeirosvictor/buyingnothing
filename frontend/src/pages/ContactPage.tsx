import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const mailtoLink = `mailto:test@gmail.com?subject=${encodeURIComponent(
        `[Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-xl font-black uppercase tracking-tight text-stone-900 dark:text-stone-100">
          {t('contact.title')}
        </h1>
        <p className="mt-4 text-stone-500 dark:text-stone-400">
          {t('contact.subtitle')}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 p-6 md:p-8 rounded-sm"
      >
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
            {t('contact.form.success')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
            {t('contact.form.error')}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs tracking-[0.2em] uppercase font-bold text-stone-600 dark:text-stone-400 mb-2"
            >
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border-2 ${
                errors.name
                  ? 'border-red-500 dark:border-red-500'
                  : 'border-stone-200 dark:border-stone-700'
              } text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-moss-500 transition-colors`}
              placeholder={t('contact.namePlaceholder')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs tracking-[0.2em] uppercase font-bold text-stone-600 dark:text-stone-400 mb-2"
            >
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border-2 ${
                errors.email
                  ? 'border-red-500 dark:border-red-500'
                  : 'border-stone-200 dark:border-stone-700'
              } text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-moss-500 transition-colors`}
              placeholder={t('contact.emailPlaceholder')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="subject"
            className="block text-xs tracking-[0.2em] uppercase font-bold text-stone-600 dark:text-stone-400 mb-2"
          >
            {t('contact.subject')}
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border-2 ${
              errors.subject
                ? 'border-red-500 dark:border-red-500'
                : 'border-stone-200 dark:border-stone-700'
            } text-stone-900 dark:text-stone-100 focus:outline-none focus:border-moss-500 transition-colors appearance-none cursor-pointer`}
          >
            <option value="">{t('contact.subjectPlaceholder')}</option>
            <option value="general">{t('contact.subjects.general')}</option>
            <option value="question">{t('contact.subjects.question')}</option>
            <option value="feedback">{t('contact.subjects.feedback')}</option>
            <option value="report">{t('contact.subjects.report')}</option>
            <option value="partnership">{t('contact.subjects.partnership')}</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="message"
            className="block text-xs tracking-[0.2em] uppercase font-bold text-stone-600 dark:text-stone-400 mb-2"
          >
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 border-2 ${
              errors.message
                ? 'border-red-500 dark:border-red-500'
                : 'border-stone-200 dark:border-stone-700'
            } text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-moss-500 transition-colors resize-none`}
            placeholder={t('contact.messagePlaceholder')}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-moss-500 text-white font-bold text-sm uppercase tracking-widest hover:bg-moss-600 disabled:bg-moss-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? t('common.loading') : t('contact.send')}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-stone-400">
          {t('contact.alternatively')}{' '}
          <a
            href="mailto:test@gmail.com"
            className="text-moss-500 hover:text-moss-600 dark:text-moss-400 dark:hover:text-moss-300 underline"
          >
            test@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
