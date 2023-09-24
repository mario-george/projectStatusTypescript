export interface Dragable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
export interface DragTarget {
  dragOver(event: DragEvent): void;
  drop(event: DragEvent): void;
  dragLeave(event: DragEvent): void;
}
