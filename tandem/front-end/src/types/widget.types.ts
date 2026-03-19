export interface QuizWidget {
  id: string;
  type: 'quiz';
  question: string;
  options: string[];
  correctIndex: number;
}

// на будущее
export interface TrueFalseWidget {
  id: string;
  type: 'true-false';
  statement: string;
  correct: boolean;
  explanation?: string;
}

// на будущее
export interface CodeCompletionWidget {
  id: string;
  type: 'code-completion';
  code: string;
  blanks: string[];
  correctAnswers: string[];
}

export type Widget = QuizWidget | TrueFalseWidget | CodeCompletionWidget;

// Type guards
export const isQuizWidget = (widget: Widget): widget is QuizWidget => {
  return widget.type === 'quiz';
};

export const isTrueFalseWidget = (widget: Widget): widget is TrueFalseWidget => {
  return widget.type === 'true-false';
};

export const isCodeCompletionWidget = (widget: Widget): widget is CodeCompletionWidget => {
  return widget.type === 'code-completion';
};
