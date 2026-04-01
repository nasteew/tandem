# Frontend — Local Development Setup

## 🛠 Стек технологий

- React 19
- TypeScript
- Vite (rolldown)
- Tailwind CSS
- React Query
- React Hook Form + Zod
- Zustand
- Vitest + Testing Library

## 🚀 Установка проекта

Склонируйте репозиторий и установите зависимости:

```bash
npm install
```

---

## ⚙️ Environment Variables

Перед запуском необходимо создать файл `.env` в корне проекта и заполнить переменные окружения, указанные в .env.example

- `VITE_API_URL` — URL backend API
- `VITE_MOCK_MODE` — режим моков (`true` / `false`)

---

## 🧑‍💻 Запуск в режиме разработки

```bash
npm run dev
```

После запуска приложение автоматически откроется в браузере.
Если этого не произошло — перейдите по адресу, указанному в терминале (обычно `http://localhost:5173`).

---

## 🏗 Сборка проекта

Для продакшн-сборки выполните:

```bash
npm run build
```

Собранные файлы будут находиться в папке `dist`.

---

## 🔍 Предпросмотр продакшн-сборки

```bash
npm run preview
```

---

## 🧹 Линтинг

Проверка кода:

```bash
npm run lint
```

Автоисправление:

```bash
npm run lint:fix
```

---

## 🎨 Форматирование кода

Форматировать файлы:

```bash
npm run format
```

Проверка форматирования (например, в CI):

```bash
npm run ci:format
```

---

## 🧪 Тестирование

Запуск тестов:

```bash
npm run test
```
