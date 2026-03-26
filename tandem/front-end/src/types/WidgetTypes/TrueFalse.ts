import type { BaseLevel } from './index';

export interface TrueFalsePayload {
  statement: {
    en: string;
    ru: string;
  };
  explanation?: {
    en: string;
    ru: string;
  };
}

export interface TrueFalseLevel extends BaseLevel<TrueFalsePayload> {
  type: 'true-false';
}

export interface TrueFalseAnswer {
  value: boolean;
}
