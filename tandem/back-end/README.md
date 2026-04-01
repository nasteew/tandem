# Tandem Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Backend-часть приложения Tandem на базе NestJS и Prisma.

## 🚀 Технологический стек

- **NestJS v11** — фреймворк для эффективных и масштабируемых серверных приложений.
- **Prisma v7** — ORM для работы с PostgreSQL с использованием Driver Adapters.
- **PostgreSQL** — реляционная база данных.
- **Swagger** — документация API (доступна по пути `/api`).
- **TypeScript** — основной язык разработки.

---

## 🛠 Установка и запуск

1. Перейдите в папку `back-end`:

   ```bash
   cd back-end
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Настройте файл `.env` (см. Environment Variables).

4. Запустите проект:

   ```bash
   # Режим разработки
   npm run start:dev

   # Сборка проекта
   npm run build

   # Режим продакшн
   npm run start:prod
   ```

---

## ⚙️ Environment Variables

Перед запуском необходимо создать файл `.env` в корне проекта и заполнить переменные окружения, указанные в .env.example

### 📌 Описание переменных

#### 🖥 Сервер

- `PORT` — порт, на котором запускается приложение (например: `3001`)
- `NODE_ENV` — режим запуска (`development`, `production`)

---

#### 🗄 База данных (PostgreSQL + Prisma)

- `DB_HOST` — хост базы данных
- `DB_PORT` — порт базы данных
- `DB_USER` — пользователь БД
- `DB_PASSWORD` — пароль
- `DB_NAME` — название базы
- `DATABASE_URL` — строка подключения (используется Prisma)

Пример:

```
postgresql://user:password@localhost:5432/db_name
```

---

#### 🔐 Аутентификация

- `JWT_SECRET` — секрет для access токена
- `JWT_EXPIRES_IN` — время жизни access токена (например: `900(15m)`)
- `JWT_REFRESH_SECRET` — секрет для refresh токена
- `JWT_REFRESH_EXPIRES_IN` — время жизни refresh токена (например: `604800(7d)`)
- `BCRYPT_SALT_ROUNDS` — сложность хеширования (например: `10`)
- `COOKIE_DOMAIN` — домен для cookies

---

#### ☁️ Supabase

- `SUPABASE_URL` — URL проекта Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — сервисный ключ (server-side)
- `SUPABASE_BUCKET` — имя bucket для хранения файлов

---

#### 🔑 Google OAuth

- `GOOGLE_CALLBACK_URL` — callback URL после авторизации
- `GOOGLE_CLIENT_ID` — client id
- `GOOGLE_CLIENT_SECRET` — client secret

---

#### 🤖 AI (OpenRouter)

- `OPENROUTER_API_KEY` — API ключ OpenRouter
- `OPENROUTER_URL` — базовый URL API (например: `https://openrouter.ai/api/v1`)

## 🗄 Работа с Базой Данных

Проект использует Prisma. Основные команды:

- `npm run prisma:generate` — генерация клиента Prisma.
- `npm run prisma:migrate` — создание и применение миграций.
- `npm run prisma:studio` — визуальный интерфейс для работы с данными.
- `npm run prisma:push` — быстрая синхронизация схемы с БД.

---

## 📡 API Документация

Swagger документация доступна по адресу:
`http://localhost:3001/api` (или на другом порту, указанном в `.env`)

---

## 🧹 Линтинг и форматирование

- `npm run lint` — проверка кода линтером.
- `npm run format` — автоматическое форматирование кода.
