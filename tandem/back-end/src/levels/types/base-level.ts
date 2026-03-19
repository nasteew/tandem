export interface BaseLevel<TPayload> {
  id: string;
  version: number;
  difficulty: number;
  tags: string[];
  payload: TPayload;
}
