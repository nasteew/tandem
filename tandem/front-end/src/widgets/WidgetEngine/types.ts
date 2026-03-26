export interface BaseWidget {
  id: number | string;
  type: string;
  title: string;
  payload: unknown;
}

export interface AsyncSorterWidget extends BaseWidget {
  type: 'async-sorter';
  payload: {
    blocks: string[];
  };
}

export interface CodeCompletionWidget extends BaseWidget {
  type: 'code-completion';
  payload: {
    blocks: string[];
  };
}

export interface QuizWidget extends BaseWidget {
  type: 'quiz';
  payload: {
    question: { en?: string; ru?: string };
    options: { en?: string; ru?: string }[];
  };
}

export interface TrueFalseWidget extends BaseWidget {
  type: 'true-false';
  payload: {
    statement: { en: string; ru: string };
    explanation?: { en: string; ru: string };
  };
}

export type AnyWidget = AsyncSorterWidget | CodeCompletionWidget | QuizWidget | TrueFalseWidget;
