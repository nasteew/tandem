# Дата: 2026-03-13

- **Что было сделано:**
1. Тесты для фронтенда
- для компонента Button: рендер children, применение primary варианта по умолчанию, обработка кликов
- для компонента Card: рендер без description, условный рендеринг (иконка без title)
- для хука useAuthMutations: useLoginMutation - успешный вход (обновление store, localStorage, навигация), useRegisterMutation - успешная регистрация (удаление confirmPassword), useLogoutMutation - успешный выход (очистка store и localStorage)

- **Проблемы:**
1. Типизация моков в Vitest: Ошибка vi.mocked().mockResolvedValue is not a function
2. CSS Modules в тестах: Классы из CSS Modules искажаются

- **Решения (или попытки):**
1. vi.mocked() для создания типизированных моков
2. className.contains() вместо toHaveClass()

- **Что изучила:**
1. Особенности Vitest и React Testing Library
2. Тестирование условного рендеринга
3. Мокирование хуков и API

## Затраченное время:
4 часа