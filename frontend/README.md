# Buy Nothing - Frontend

React + TypeScript + Vite + Tailwind CSS frontend for the Buy Nothing donation platform.

## Features

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **react-i18next** for internationalization (English & Portuguese)
- Language switcher component

## Project Structure

```
src/
├── components/
│   └── LanguageSwitcher.tsx    # Language selection component
├── i18n/
│   ├── locales/
│   │   ├── en/                 # English translations
│   │   │   └── index.ts
│   │   └── pt-BR/              # Portuguese (Brazil) translations
│   │       └── index.ts
│   └── index.ts                # i18n configuration
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles + Tailwind
```

## Package Manager

This project uses **pnpm**.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Internationalization

The app uses `react-i18next` with two supported languages:

- **English (en)** - Default
- **Portuguese - Brazil (pt-BR)**

Language is auto-detected from:
1. LocalStorage (saved preference)
2. Browser language settings
3. Falls back to English

### Adding New Translations

1. Add the key to `src/i18n/locales/en/index.ts`
2. Add the translation to `src/i18n/locales/pt-BR/index.ts`
3. Use in components:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}
```

## Environment Variables

Create a `.env` file for API configuration:

```
VITE_API_URL=http://localhost:8000
```

## Development

The frontend expects the backend to be running on `http://localhost:8000`.

CORS is configured in the backend to allow requests from `http://localhost:5173`.
