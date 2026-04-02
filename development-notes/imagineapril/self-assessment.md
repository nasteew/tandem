# Self-Assessment: imagineapril

## 1. Таблица фич

| Категория | Фича | Баллы | Ссылка на код/PR |
|-----------|------|-------|------------------|
| **My Components** | Rich UI Screen: Dashboard | +20 | [PR #58](https://github.com/nasteew/tandem/pull/58) |
| **My Components** | Rich UI Screen: Statistic | +20 | [PR #66](https://github.com/nasteew/tandem/pull/66) |
| **My Components** | Rich UI Screen: Welcome-страница | +20 | [PR #10](https://github.com/nasteew/tandem/pull/10) |
| **My Components** | Rich UI Screen: регистрация/авторизация | +20 | [PR #25](https://github.com/nasteew/tandem/pull/25) |
| **My Components** | Rich UI Screen: Quiz-виджет | +20 | [PR #69](https://github.com/nasteew/tandem/pull/69) |
| **My Components** | Rich UI Screen: True/False-виджет | +20 | [PR #69](https://github.com/nasteew/tandem/pull/69) |
| **My Components** | Rich UI Screen: header | +20 | [PR #10](https://github.com/nasteew/tandem/pull/10) |
| **UI & Interaction** | Advanced Animations (анимация кода на главной странице, робот) | +10 | [PR #10](https://github.com/nasteew/tandem/pull/10) |
| **UI & Interaction** | Theme Switcher (Light/Dark) | +10 | [PR #71](https://github.com/nasteew/tandem/pull/71) |
| **UI & Interaction** | Responsive (адаптация от 320px) | +5 | [PR #71](https://github.com/nasteew/tandem/pull/71/changes) |
| **Architecture** | State Manager (Zustand) | +10 | [PR #25](https://github.com/nasteew/tandem/pull/25) [PR #58](https://github.com/nasteew/tandem/pull/58) |
| **Architecture** | Design Patterns (Provider, Facade, Adapter) | +10 | [PR #71](https://github.com/nasteew/tandem/pull/71) [PR #66](https://github.com/nasteew/tandem/pull/66) [PR #25](https://github.com/nasteew/tandem/pull/25) |
| **Architecture** | API Layer (выделение слоя работы с API: dashboard, statistic, auth) | +10 | [PR #58](https://github.com/nasteew/tandem/pull/58) [PR #66](https://github.com/nasteew/tandem/pull/66) [PR #25](https://github.com/nasteew/tandem/pull/25) |
| **Frameworks** | React | +5 | [PR #10](https://github.com/nasteew/tandem/pull/10) |

**Итого личных баллов:** 210

---

## 2. Описание моей работы

### Роль и задачи

Я была фронтенд-разработчиком в команде. На старте мы выбрали стек: **TypeScript, React, NestJS, Tailwind CSS** (впоследствии я использовала CSS-модули и переменные для гибкости). Мой основной фокус — создание пользовательского интерфейса, интеграция с бэкендом, обеспечение отзывчивости и тем.

### Что я сделала с нуля

1. **Стартовая страница**
   - Разработала лендинг с анимацией «бегущего кода» (canvas), роботом-маскотом (SVG), бургер-меню, семантической вёрсткой и lazy loading.
   - Отказалась от 3D-моделей из-за низкого качества генерации AI, нашла альтернативу в виде SVG и анимации.

2. **Авторизация и маршрутизация**
   - Создала формы логина и регистрации.
   - Настроила роутинг с помощью `react-router-dom`.
   - Интегрировала авторизацию с бэкендом (токен сохранялся в Zustand).
   - Добавила переключатель видимости пароля (глазок).

3. **Dashboard (главная страница пользователя)**
   - Разработала страницу с отображением статистики пользователя и прогресса по виджетам.
   - Создала API-слой (`dashboard.api.ts`) и кастомные хуки на React Query для кеширования и инвалидации.
   - Решила проблемы с бесконечными запросами streak (через `useRef`)

4. **Страница глобальной статистики**
   - Реализовала таблицу лидеров с серверной сортировкой (по стрику, уровням, времени).
   - Добавила компоненты `GlobalMetrics` и `LeaderboardHighlights`.
   - Настроила адаптивность: горизонтальный скролл на мобильных.

5. **Виджеты Quiz и True/False**
   - Разработала два полноценных виджета с таймерами, уровнями сложности и мгновенной обратной связью.
   - Интегрировала их в `WidgetEngine` через новые кейсы.
   - Создала бэкенд-типы и обновила `widgets-meta.json`.

6. **Система тем (light/dark) и адаптивность**
   - Реализовала переключение тем с сохранением в `localStorage`, используя `data-theme` и CSS-переменные.
   - Переписала жёсткие Tailwind-классы на переменные, чтобы компоненты адаптировались.
   - Добавила адаптивность под 320px (робот скрывается, таблица скроллится).

### С какими сложностями столкнулась

- **Незнание React** потратила первую неделю на изучение, параллельно делая стартовую страницу.
- **Плохие 3D-модели от AI** — отказалась от идеи с 3D, заменила анимацией и SVG.
- **Нестабильная интеграция фронта с бэком** — исправляла через отладку, добавление try/catch, инвалидацию кэша.
- **Лишние запросы и мигания UI** — решала через `useRef`, проверку `isInitialized`, оптимизацию эффектов.
- **Стилизация для двух тем** — пришлось переписать многие компоненты, чтобы они использовали CSS-переменные вместо захардкоженных классов Tailwind.

### Инструменты и технологии

- **React** (hooks, lazy loading, context)
- **TypeScript** (строгая типизация)
- **React Router** (маршрутизация)
- **Zustand** (управление состоянием)
- **React Query (TanStack Query)** (кеширование, инвалидация)
- **CSS Modules** + CSS-переменные (стилизация и темы)
- **Git** (работа в ветках, разрешение конфликтов)

---

## 3. Два личных Feature Component (без AI)

### 1. Страница глобальной статистики (`/statistic`)

**Почему это мой личный вклад:**
- Полностью сама спроектировала и реализовала интерфейс, API-слой, хуки и таблицу.
- Настроила серверную сортировку через query-параметры и клиентский хук `useSortableData`.
- Решила проблемы с адаптивностью (горизонтальный скролл) и NaN-значениями.
- Интегрировала с бэкендом через `statistic.api.ts` и React Query.

**Кодовая база:**
- `src/pages/Statistic/Statistic.tsx`
- `src/api/statistic.api.ts`
- `src/hooks/useGlobalStats.ts`
- `src/components/StatsTable/StatsTable.tsx`
- `src/components/LeaderboardHighlights.tsx`

### 2. Авторизация и регистрация (страницы логина, регистрации, хранение токена)

**Почему это мой личный вклад:**
- Создала формы входа и регистрации с нуля, включая валидацию, переключение видимости пароля, адаптивную вёрстку.
- Настроила маршрутизацию для защищённых и публичных страниц.
- Интегрировала с бэкендом (NestJS) через кастомный `auth.api.ts`, реализовала хранение JWT токена в Zustand.
- Решила проблему мигания кнопки «SIGN IN» → «LOG OUT» через проверку `isInitialized` в сторе.
- Обработала ошибки сети и сервера (try/catch, отображение сообщений пользователю).

**Кодовая база:**
- `src/pages/Auth/LoginForm.tsx`
- `src/pages/Auth/RegisterForm.tsx`
- `src/api/auth.api.ts`
- `src/store/authStore.ts` (Zustand)
- `src/components/Navbar/Navbar.tsx` (условный рендер кнопок)

---

_Дата: 1 апреля 2026_  
_PR для самооценки: [#NNN](https://github.com/nasteew/tandem/pull/NNN) (будет добавлен)_