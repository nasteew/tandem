import { useState, useCallback, useMemo } from 'react';
import type { CodeCompletionBlank } from '@/types/WidgetTypes/CodeCompletion';

export function useCodeCompletionLogic(blanks: CodeCompletionBlank[]) {
  const [inputs, setInputs] = useState<string[]>(() => blanks.map(() => ''));

  const handleInputChange = useCallback((index: number, value: string) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const resetInputs = useCallback(() => {
    setInputs(blanks.map(() => ''));
  }, [blanks]);

  const allFilled = useMemo(
    () => inputs.every((v) => v.trim().length > 0),
    [inputs]
  );

  return { inputs, handleInputChange, resetInputs, allFilled };
}
