import { useParams, Link } from 'react-router-dom';
import { useWidget } from '../../hooks/widget/useWidget';
import { LoadingScreen } from '@/components/Loading/Loading';
import { QuizWidget } from '@/components/Widgets/QuizWidget/QuizWidget';
import {
  isQuizWidget,
  isTrueFalseWidget,
  isCodeCompletionWidget,
  type TrueFalseWidget,
  type CodeCompletionWidget,
} from '../../types/widget.types';
import styles from './WidgetDetailPage.module.css';

// Временно создадим простые компоненты для других типов виджетов
const TrueFalseWidgetComponent = ({ data }: { data: TrueFalseWidget }) => (
  <div className={styles.widgetContainer}>
    <h2>True/False</h2>
    <p>{data.statement}</p>
    {data.explanation && <p className={styles.explanation}>{data.explanation}</p>}
  </div>
);

const CodeCompletionWidgetComponent = ({ data }: { data: CodeCompletionWidget }) => (
  <div className={styles.widgetContainer}>
    <h2>Code Completion Widget</h2>
    <pre className={styles.code}>{data.code}</pre>
    <p>Fill in: {data.blanks.join(', ')}</p>
  </div>
);

export const WidgetDetailPage = () => {
  const { widgetId } = useParams<{ widgetId: string }>();
  const { data: widget, isLoading, error } = useWidget(widgetId || null);

  if (isLoading) return <LoadingScreen />;
  if (error || !widget) {
    return (
      <div className={styles.error}>
        <h2>Widget not found</h2>
        <p>{error?.message || 'The requested widget does not exist'}</p>
        <Link to="/widgets" className={styles.backLink}>
          ← Back to Widgets
        </Link>
      </div>
    );
  }

  const renderWidget = () => {
    if (isQuizWidget(widget)) {
      return (
        <QuizWidget
          data={widget}
          onSubmit={(isCorrect) => {
            console.log('Quiz submitted:', isCorrect);
            // Здесь будет отправка результата на сервер
          }}
        />
      );
    }
    if (isTrueFalseWidget(widget)) {
      return <TrueFalseWidgetComponent data={widget} />;
    }
    if (isCodeCompletionWidget(widget)) {
      return <CodeCompletionWidgetComponent data={widget} />;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link to="/widgets" className={styles.backLink}>
          ← Back to Widgets
        </Link>
      </div>

      <div className={styles.content}>{renderWidget()}</div>
    </div>
  );
};

export default WidgetDetailPage;
