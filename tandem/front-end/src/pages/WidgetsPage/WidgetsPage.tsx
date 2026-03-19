import { Link } from 'react-router-dom';
import { useWidgets } from '../../hooks/widget/useWidget';
import { Card } from '@/components/Card/Card';
import { LoadingScreen } from '@/components/Loading/Loading';
import {
  isQuizWidget,
  isTrueFalseWidget,
  isCodeCompletionWidget,
  type Widget,
} from '@/types/widget.types';
import styles from './WidgetsPage.module.css';

const QuizIcon = () => (
  <svg className={styles.widgetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M9 9a3 3 0 1 1 4 2.83 1 1 0 0 0-1 1V15" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="18" r="0.5" fill="currentColor" />
  </svg>
);

const TrueFalseIcon = () => (
  <svg className={styles.widgetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M7 12l3 3 7-7" strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="19" r="2" strokeWidth="1.5" />
    <circle cx="5" cy="5" r="2" strokeWidth="1.5" />
  </svg>
);

const CodeIcon = () => (
  <svg className={styles.widgetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M8 8L4 12L8 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8L20 12L16 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5" />
  </svg>
);

const getWidgetIcon = (widget: Widget) => {
  if (isQuizWidget(widget)) return <QuizIcon />;
  if (isTrueFalseWidget(widget)) return <TrueFalseIcon />;
  if (isCodeCompletionWidget(widget)) return <CodeIcon />;
  return null;
};

const getWidgetDescription = (widget: Widget) => {
  if (isQuizWidget(widget)) {
    return `Quiz • ${widget.options.length} options`;
  }
  if (isTrueFalseWidget(widget)) {
    return 'True/False • Statement verification';
  }
  if (isCodeCompletionWidget(widget)) {
    return `Code Completion • Fill in ${widget.blanks.length} blank${widget.blanks.length > 1 ? 's' : ''}`;
  }
  return '';
};

export const WidgetsPage = () => {
  const { data: widgets, isLoading, error } = useWidgets();

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <div className={styles.error}>
        <h2>Error loading widgets</h2>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Interactive Widgets</h1>
        <p className={styles.subtitle}>Choose a widget to practice your skills</p>
      </div>

      <div className={styles.grid}>
        {widgets?.map((widget) => (
          <Link key={widget.id} to={`/widgets/${widget.id}`} className={styles.cardLink}>
            <Card
              icon={getWidgetIcon(widget)}
              title={widget.type
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              description={getWidgetDescription(widget)}
              className={styles.widgetCard}
            >
              <div className={styles.cardFooter}>
                <span className={styles.practiceButton}>Practice →</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WidgetsPage;
