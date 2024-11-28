export type Position = "top" | "bottom" | "left" | "right";
export interface Option {
  position?: Position;
  text: string;
  class?: string;
}
