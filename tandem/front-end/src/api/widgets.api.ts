import type {
  Widget,
  QuizWidget,
  TrueFalseWidget,
  CodeCompletionWidget,
} from '@/types/widget.types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// --- Mock Data ---
const MOCK_QUIZ: QuizWidget = {
  id: 'quiz-1',
  type: 'quiz',
  question: 'Что вернет typeof null?',
  options: ['null', 'undefined', 'object', 'NaN'],
  correctIndex: 2,
};

const MOCK_TRUE_FALSE: TrueFalseWidget = {
  id: 'tf-1',
  type: 'true-false',
  statement: 'Promise.all() возвращает результаты в порядке завершения промисов',
  correct: false,
  explanation: 'Promise.all() сохраняет порядок входного массива',
};

const MOCK_CODE_COMPLETION: CodeCompletionWidget = {
  id: 'code-1',
  type: 'code-completion',
  code: 'const result = arr.___(x => x > 0);',
  blanks: ['___'],
  correctAnswers: ['filter'],
};

export const MOCK_WIDGETS: Widget[] = [
  MOCK_QUIZ,
  MOCK_TRUE_FALSE,
  MOCK_CODE_COMPLETION,
  {
    id: 'quiz-2',
    type: 'quiz',
    question: 'Что такое замыкание (closure) в JavaScript?',
    options: [
      'Функция, которая запоминает свою лексическую область видимости',
      'Способ объявления приватных переменных',
      'Синтаксическая ошибка',
      'Тип данных',
    ],
    correctIndex: 0,
  },
  {
    id: 'quiz-3',
    type: 'quiz',
    question: 'Каким будет результат: 2 + "2" - 1 ?',
    options: ['3', '21', 'NaN', 'Ошибка'],
    correctIndex: 0,
  },
  {
    id: 'tf-2',
    type: 'true-false',
    statement: 'null это объект в JavaScript',
    correct: true,
    explanation: 'typeof null возвращает "object" (это известная ошибка языка)',
  },
];

// --- Helpers ---
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(300 + Math.random() * 500);

// --- Public API ---

/**
 * Получает список всех виджетов
 */
export const getAllWidgets = async (): Promise<Widget[]> => {
  console.log('📡 [widgets.api] getAllWidgets()');

  if (USE_MOCK) {
    console.log('⚠️ [MOCK] Returning all mock widgets');
    await randomDelay();
    return MOCK_WIDGETS;
  }

  try {
    const response = await fetch('/api/widgets');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const rawData = await response.json();
    return rawData as Widget[];
  } catch (error) {
    console.error('❌ Failed to fetch widgets:', error);
    throw new Error('Failed to load widgets. Please try again.');
  }
};

/**
 * Получает данные виджета по его ID.
 */
export const getWidgetById = async (widgetId: string): Promise<Widget> => {
  console.log(`📡 [widgets.api] getWidgetById("${widgetId}")`);

  if (USE_MOCK) {
    console.log('⚠️ [MOCK] Returning mock widget by id');
    await randomDelay();

    const widget = MOCK_WIDGETS.find((w) => w.id === widgetId);
    if (!widget) {
      throw new Error(`Widget with id ${widgetId} not found`);
    }
    return widget;
  }

  try {
    const response = await fetch(`/api/widgets/${widgetId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const rawData = await response.json();
    return rawData as Widget;
  } catch (error) {
    console.error(`❌ Failed to fetch widget ${widgetId}:`, error);
    throw new Error('Failed to load widget. Please try again.');
  }
};
