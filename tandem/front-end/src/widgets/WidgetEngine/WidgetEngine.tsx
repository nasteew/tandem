import type { Levels, Solutions, ValidateResponse } from '@/types/WidgetTypes/index';
import { AsyncSorterGame } from '@/widgets/AsyncSorter/AsyncSorterGame';

interface WidgetEngineProps {
  widget: Levels;
  onSubmit: (answer: Solutions) => Promise<ValidateResponse>;
  onNextLevel: () => void;
}

/**
 * WidgetEngine — роутит по widget.type на нужный компонент.
 * Чтобы добавить новый виджет: добавь case сюда + тип в Levels/Solutions.
 */
export function WidgetEngine({ widget, onSubmit, onNextLevel }: WidgetEngineProps) {
  switch (widget.type) {
    case 'async-sorter':
      return <AsyncSorterGame level={widget} onValidate={onSubmit} onNextLevel={onNextLevel} />;

    default:
      return <div style={{ color: 'red' }}>Unknown widget type: {(widget as Levels).type}</div>;
  }
}
