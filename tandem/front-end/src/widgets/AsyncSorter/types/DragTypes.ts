export type DragStartInfo = {
  id: string;
  sourceZone: string;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  hoverZone?: string | null;
};

export type DropCallback = (x: number, y: number, id: string, sourceZone: string) => void;
