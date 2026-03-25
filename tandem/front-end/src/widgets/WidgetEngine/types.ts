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

export type AnyWidget = AsyncSorterWidget | CodeCompletionWidget;
