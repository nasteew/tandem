import { useQuery } from '@tanstack/react-query';
import { getAllWidgets, getWidgetById } from '@/api/widgets.api';
import type { Widget } from '@/types/widget.types';

/**
 * Хук для получения списка всех виджетов
 */
export const useWidgets = () => {
  return useQuery<Widget[], Error>({
    queryKey: ['widgets'],
    queryFn: getAllWidgets,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/**
 * Хук для получения конкретного виджета по ID
 */
export const useWidget = (widgetId: string | null) => {
  return useQuery<Widget, Error>({
    queryKey: ['widget', widgetId],
    queryFn: () => {
      if (!widgetId) {
        throw new Error('Widget ID is required');
      }
      return getWidgetById(widgetId);
    },
    enabled: !!widgetId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
