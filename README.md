# Buy Nothing

A community-driven donation platform inspired by the Buy Nothing movement, bringing the spirit of neighborly generosity from Canada to Brazil.

## About

This application is inspired by the Buy Nothing groups I experienced while living in Canada — hyperlocal communities where neighbors give away items they no longer need, completely free of charge. No money changes hands. No bartering. Just people helping people.

The goal is to make this concept more accessible and introduce it to my home country of Brazil, fostering a culture of donation between neighbors. By creating a dedicated platform, we can help build stronger local communities where generosity becomes the norm, not the exception.

## Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation using Python type hints

### Frontend
- **React 19** - UI library
- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **react-i18next** - Internationalization framework
- **pnpm** - Package manager

## Project Structure

```
.
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── models/           # SQLAlchemy models
│   │   ├── routes/           # API route handlers
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── database.py       # Database configuration
│   │   ├── main.py           # FastAPI application
│   │   └── schemas.py        # Request/response schemas
│   ├── .env.example          # Environment variables template
│   ├── alembic.ini           # Alembic configuration
│   ├── requirements.txt      # Python dependencies
│   └── run.py                # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── i18n/             # Internationalization
│   │   │   ├── locales/
│   │   │   │   ├── en/       # English translations
│   │   │   │   └── pt-BR/    # Portuguese (Brazil) translations
│   │   │   └── index.ts      # i18n configuration
│   │   ├── App.tsx           # Main application component
│   │   ├── main.tsx          # Application entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Data Model

The application uses three core models with the following relationships:

### User
- Represents community members
- Can post items for donation
- Can receive items from other users

### Item
- Represents an item available for donation
- Belongs to a donor (User)
- Has a status: `available`, `pending`, or `completed`
- Contains details like title, description, category, condition, and pickup location

### Donation
- Represents the transaction when an item is claimed
- **Foreign Keys:**
  - `item_id` → Item (the item being donated)
  - `donor_id` → User (the person giving the item)
  - `recipient_id` → User (the person receiving the item)

This 3-FK structure allows tracking the complete donation lifecycle while maintaining data integrity.

## Internationalization (i18n)

The application supports multiple languages using react-i18next:

- **English (en)** - Default language
- **Portuguese - Brazil (pt-BR)** - Secondary language

Language detection order:
1. LocalStorage (user preference)
2. Browser language settings
3. HTML tag

Users can switch languages using the language switcher component in the header.

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- pnpm (install via `npm install -g pnpm`)
- PostgreSQL 14+

### Backend Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
alembic upgrade head
```

5. Start the development server:
```bash
python run.py
# Or: uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Users
- `POST /users/` - Create a new user
- `GET /users/` - List all users
- `GET /users/{id}` - Get user by ID

### Items
- `POST /items/` - Create a new item
- `GET /items/` - List items (filter by status)
- `GET /items/{id}` - Get item by ID
- `PUT /items/{id}` - Update item

### Donations
- `POST /donations/` - Create a donation request
- `GET /donations/` - List all donations
- `GET /donations/{id}` - Get donation by ID
- `POST /donations/{id}/complete` - Mark donation as complete

## Development

### Database Migrations

Create a new migration:
```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback:
```bash
alembic downgrade -1
```

### Adding Translations

1. Add new keys to `frontend/src/i18n/locales/en/index.ts`
2. Add corresponding translations to `frontend/src/i18n/locales/pt-BR/index.ts`
3. Use in components with `const { t } = useTranslation()` and `{t('key.subkey')}`

## Contributing

This project is in early development. The focus is on building a solid foundation with:
- Clean, maintainable code
- Proper internationalization from the start
- Simple but effective data models
- Clear documentation

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Inspired by the Buy Nothing Project and the generosity of Canadian communities
- Built with the goal of bringing neighborly kindness to Brazil
