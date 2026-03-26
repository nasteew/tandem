import type { Levels, Solutions, ValidateResponse } from '@/types/WidgetTypes/index';
import { AsyncSorterGame } from '@/widgets/AsyncSorter/AsyncSorterGame';
import { CodeCompletionGame } from '@/widgets/CodeCompletion/CodeCompletionGame';
import { QuizWidget } from '@/widgets/QuizWidget/QuizWidget';

interface WidgetEngineProps {
  widget: Levels;
  onSubmit: (answer: Solutions) => Promise<ValidateResponse>;
  onNextLevel: () => void;
  onSuccess: (timeMs: number) => void;
}

export function WidgetEngine({ widget, onSubmit, onNextLevel, onSuccess }: WidgetEngineProps) {
  switch (widget.type) {
    case 'async-sorter':
      return (
        <AsyncSorterGame
          level={widget}
          onValidate={onSubmit}
          onNextLevel={onNextLevel}
          onSuccess={onSuccess}
        />
      );
    case 'code-completion':
      return (
        <CodeCompletionGame
          level={widget}
          onValidate={onSubmit}
          onNextLevel={onNextLevel}
          onSuccess={onSuccess}
        />
      );
    case 'quiz':
      return (
        <QuizWidget
          level={widget}
          onSubmit={onSubmit}
          onNextLevel={onNextLevel}
          onSuccess={onSuccess}
        />
      );
    default:
      return <div style={{ color: 'red' }}>Unknown widget type: {(widget as Levels).type}</div>;
  }
}
