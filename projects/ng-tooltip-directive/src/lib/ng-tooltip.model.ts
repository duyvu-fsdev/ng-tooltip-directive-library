export type Position = 'top' | 'bottom' | 'left' | 'right' | undefined;
export interface Option {
  position?: Position;
  text: string;
  class?: string;
}
