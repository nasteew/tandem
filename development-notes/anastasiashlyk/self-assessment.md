# Self-Assessment: anastasiashlyk

## Pull request:

https://github.com/nasteew/tandem/pull/89

## Таблица фич

| Категория            | Фича                                      | Баллы | Ссылка на код/PR                          |
| -------------------- | ----------------------------------------- | ----- | ----------------------------------------- |
| **My Components**    | Complex component: Code-completion-widget | +25   | https://github.com/nasteew/tandem/pull/64 |
| **My Components**    | Сложный бэкенд-сервис: AI Context Manager | +30   | https://github.com/nasteew/tandem/pull/18 |
| **My Components**    | Complex Component: Chat UI                | +25   | https://github.com/nasteew/tandem/pull/18 |
| **Backend & Data**   | Backend Framework: NestJS                 | +10   | https://github.com/nasteew/tandem/pull/18 |
| **Backend & Data**   | Custom Backend (NestJS + Prisma)          | +30   | https://github.com/nasteew/tandem/pull/30 |
| **Backend & Data**   | Real-time: SSE                            | +20   | https://github.com/nasteew/tandem/pull/30 |
| **AI**               | AI: AI Chat UI                            | +20   | https://github.com/nasteew/tandem/pull/18 |
| **AI**               | AI: AI Streaming                          | +10   | https://github.com/nasteew/tandem/pull/18 |
| **AI**               | AI: Raw LLM API                           | +10   | https://github.com/nasteew/tandem/pull/18 |
| **Game**             | UI: Audio API                             | +5    | https://github.com/nasteew/tandem/pull/50 |
| **UI & Interaction** | Accessibility (a11y)                      | +10   | https://github.com/nasteew/tandem/pull/18 |
| **UI & Interaction** | i18n                                      | +10   | https://github.com/nasteew/tandem/pull/74 |
| **UI & Interaction** | Responsive                                | +5    | https://github.com/nasteew/tandem/pull/64 |
| **Architecture**     | API Layer                                 | +10   | https://github.com/nasteew/tandem/pull/30 |
| **Frameworks**       | React                                     | +5    | https://github.com/nasteew/tandem/pull/64 |

**Итого личных баллов:** 225

---

## Описание моей работы

В рамках проекта я занималась разработкой AI-модуля приложения — как backend, так и frontend части. Основной моей задачей было создание полноценного интерактивного AI-интервьюера с потоковой передачей данных, а также разработка обучающего виджета для тренировки навыков написания кода. Кроме того, я реализовала систему i18n для всего приложения и обеспечила доступность интерфейса.

---

## Основной вклад

### 1. AI-интервьюер (Backend)

Я разработала полноценный AI-сервис на NestJS:

- интеграцию с OpenRouter API без сторонних AI-SDK (native fetch)
- потоковую передачу ответов через SSE (chunked transfer encoding)
- систему fallback между моделями (если одна недоступна — автоматически переключается на следующую)
- сохранение истории диалога в базе данных через Prisma
- управление контекстом разговора (до 20 последних сообщений)
- динамическую генерацию системного промпта в зависимости от уровня (junior / middle / senior) и языка (EN / RU)
- эндпоинты для чата и получения истории переписки

### 2. AI-интервьюер (Frontend)

Я реализовала полноценный Chat UI на React:

- потоковое отображение ответов AI в реальном времени (chunk за chunk)
- сохранение `conversationId` между сессиями (localStorage)
- восстановление истории диалога при перезагрузке страницы
- выбор уровня интервью через overlay перед началом сессии
- возможность перезапустить интервью с очисткой истории
- голосовой ввод (Web Speech API / SpeechRecognition)
- озвучивание ответов AI (SpeechSynthesis) с debounce и поддержкой стриминга
- переключение голоса с сохранением предпочтения в localStorage

Для чистой архитектуры разделила логику на независимые хуки:

- `useChat` — оркестрация всего чата
- `useChatMessages` — управление состоянием сообщений
- `useAIStreaming` — изолированный слой работы с API (без JSX)
- `useAutoScroll` — автопрокрутка к последнему сообщению
- `useSpeechRecognition` — голосовой ввод
- `useTextToSpeech` — озвучивание с фильтрацией markdown

### 3. Widget: Code Completion Game

Я разработала интерактивный обучающий виджет для тренировки написания кода:

- игровая механика: заполнение пропусков в реальном коде
- кастомный редактор кода с inline-inputs внутри `<pre>`, Tab-навигацией между полями и авто-шириной поля
- система подсказок с тремя уровнями сложности (полная подсказка / длина ответа / без подсказок)
- таймер обратного отсчёта (90 секунд) с паузой при открытом модале
- валидация ответов через backend
- экраны победы/поражения с анимированными роботами
- поддержка i18n во всех текстах виджета

### 4. Система i18n

Я реализовала и настроила интернационализацию всего приложения:

- настройка `i18next` с `LanguageDetector` и `initReactI18next`
- 9 namespace-файлов (navbar, hero, features, dashboard, statistic, auth, agent, widgets, profile)
- поддержка EN и RU с автоопределением языка браузера
- компонент `LanguageSwitcher` с сохранением в localStorage
- перевод серверных ошибок на фронтенде (`translateServerError`) — backend возвращает EN, пользователь видит локализованный текст
- адаптация языка в SpeechRecognition и SpeechSynthesis под текущую локаль

### 5. Тестирование

Я написала unit-тесты для AI-сервиса:

- тесты на Vitest с моками fetch, Prisma, ConfigService и Express Response
- тест на корректную установку заголовка `x-conversation-id`
- тест на потоковую передачу данных (`res.write` / `res.end`)
- использование кастомного `createMockStream` для симуляции ReadableStream

---

## Используемые технологии

**Backend:** NestJS · Prisma · PostgreSQL · OpenRouter API

**Frontend:** React · TypeScript · Tailwind CSS · i18next · Web Speech API

**Дополнительно:** Vitest (unit tests) · native fetch + ReadableStream (без AI SDK)

---

## Сложности

Основные сложности:

- реализация потоковой передачи данных одновременно на backend (SSE) и frontend (ReadableStream reader loop)
- корректный парсинг SSE-формата вручную (`data:` строки, буферизация, `[DONE]`)
- синхронизация conversationId между сессиями без потери истории
- озвучивание стримингового текста: нельзя произносить незаконченные слова, потребовался debounce + поиск границы слова
- фильтрация markdown из текста перед TTS (backticks, заголовки, bold)
- настройка i18n с несколькими namespace и корректной работой LanguageDetector

---

## Личные Feature Components

### 1. AI-интервьюер (Chat UI + Backend)

**Что реализовано:** полный цикл — от выбора уровня до потокового ответа AI с сохранением истории, голосовым вводом и озвучиванием.

**Особенности архитектуры:**

- Raw LLM API без SDK: native fetch → ReadableStream → TextDecoder → SSE parser
- Model fallback: если первая модель возвращает ошибку, автоматически пробуется следующая
- Изолированный API-слой (`useAIStreaming`) не зависит от UI-компонентов
- Динамический системный промпт: уровень + язык влияют на поведение модели

### 2. Code Completion Game (Widget)

**Что реализовано:** интерактивный виджет с кастомным редактором кода, системой подсказок, таймером и полной i18n-поддержкой.

**Особенности:**

- кастомный inline-редактор
- трёхуровневая система сложности влияет на доступные подсказки
- логика полностью изолирована в `useCodeCompletionLogic` (useState + useCallback + useMemo)

---
