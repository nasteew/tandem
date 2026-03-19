import { useState } from 'react';
import type { QuizWidget as QuizWidgetType } from '@/types/widget.types';
import { Button } from '../../../components/ui/Button/Button';
import { Card } from '@/components/Card/Card';
import styles from './QuizWidget.module.css';
import clsx from 'clsx';

interface QuizWidgetProps {
  data: QuizWidgetType;
  onSubmit: (isCorrect: boolean, selectedIndex: number) => void;
  isSubmitting?: boolean;
}

export const QuizWidget = ({ data, onSubmit, isSubmitting = false }: QuizWidgetProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isCorrect = selectedIndex === data.correctIndex;

  const handleOptionClick = (index: number) => {
    if (hasSubmitted) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || hasSubmitted) return;
    setHasSubmitted(true);
    onSubmit(isCorrect, selectedIndex);
  };

  return (
    <Card className={styles.quizCard}>
      <h3 className={styles.question}>{data.question}</h3>

      <div className={styles.optionsGrid}>
        {data.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          let optionState: 'default' | 'selected' | 'correct' | 'wrong' = 'default';

          if (hasSubmitted) {
            if (index === data.correctIndex) optionState = 'correct';
            else if (isSelected && index !== data.correctIndex) optionState = 'wrong';
          } else if (isSelected) {
            optionState = 'selected';
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={clsx(
                styles.optionButton,
                styles[optionState],
                (hasSubmitted || isSubmitting) && styles.disabled
              )}
              disabled={hasSubmitted || isSubmitting}
            >
              <span className={styles.optionLabel}>{String.fromCharCode(65 + index)}.</span>
              <span className={styles.optionText}>{option}</span>
            </button>
          );
        })}
      </div>

      {!hasSubmitted && selectedIndex !== null && (
        <Button
          onClick={handleSubmit}
          className={styles.submitBtn}
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </Button>
      )}

      {hasSubmitted && (
        <div
          className={clsx(
            styles.feedback,
            isCorrect ? styles.feedbackSuccess : styles.feedbackError
          )}
        >
          {isCorrect ? (
            <span>✅ Correct! Well done!</span>
          ) : (
            <span>❌ Not quite. The correct answer is: {data.options[data.correctIndex]}</span>
          )}
        </div>
      )}
    </Card>
  );
};
