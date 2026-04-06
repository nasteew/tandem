import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import type { AsyncSorterBlock } from '@/types/WidgetTypes/AsyncSorter';
import styles from './ExecutionOrderInput.module.css';
import { useTranslation } from 'react-i18next';

interface ExecutionOrderInputProps {
  blocks: AsyncSorterBlock[];
  userOrder: string[];
  setUserOrder: (order: string[]) => void;
}

export const ExecutionOrderInput = ({
  blocks,
  userOrder,
  setUserOrder,
}: ExecutionOrderInputProps) => {
  const { t } = useTranslation('widgets');
  const handleClick = (id: string) => {
    if (userOrder.includes(id)) return;
    setUserOrder([...userOrder, id]);
  };

  const handleRemove = (id: string) => {
    setUserOrder(userOrder.filter((x) => x !== id));
  };

  return (
    <div className="p-4 rounded-2xl border mt-4 bg-[var(--glass-bg)] border-[var(--border-light)] backdrop-blur-xl">
      <div className="font-semibold mb-3 text-[var(--color-primary)]">
        {t('asyncSorter.clickBlocks')}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {blocks.map((b) => {
          const isUsed = userOrder.includes(b.id);

          return (
            <button
              key={b.id}
              onClick={() => handleClick(b.id)}
              disabled={isUsed}
              className={`
                w-[34px] h-[34px] rounded-full flex items-center justify-center
                font-mono text-xs backdrop-blur-xl transition-all duration-150 select-none
                border border-[var(--color-primary)]
                ${
                  isUsed
                    ? 'opacity-25 cursor-not-allowed'
                    : 'cursor-pointer bg-white/5 text-[var(--color-primary)] hover:bg-white/10 hover:-translate-y-[1px] active:scale-95'
                }
              `}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-h-[70px]">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-[var(--color-primary)]">
            {t('asyncSorter.executionOrder')}
          </span>

          {userOrder.length > 0 ? (
            <div className="flex items-center gap-2">
              {userOrder.map((id, index) => {
                const block = blocks.find((b) => b.id === id);
                return (
                  <React.Fragment key={index}>
                    <button
                      onClick={() => handleRemove(id)}
                      className={`
                        w-[34px] h-[34px] rounded-full flex items-center justify-center
                        font-mono text-xs bg-white/5 border border-[var(--color-primary)]
                        text-[var(--color-primary)] backdrop-blur-xl cursor-pointer
                        ${styles.blockResultAnim}
                      `}
                    >
                      {block?.label}
                    </button>

                    {index < userOrder.length - 1 && <span className="opacity-60 text-lg">→</span>}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <span className="text-sm text-[var(--color-text-muted)] mt-3 min-h-[22px]">
              {t('asyncSorter.empty')}
            </span>
          )}
        </div>

        <Button
          size="md"
          onClick={() => setUserOrder([])}
          disabled={userOrder.length === 0}
          variant="secondary"
          className="self-start md:self-auto"
        >
          {t('asyncSorter.btnClear')}
        </Button>
      </div>
    </div>
  );
};
