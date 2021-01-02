export type RulerItemType = 'top' | 'left' | 'right' | 'bottom';
export type RulerLineArray  =RulerLineItem[]
export interface RulerLineItem {
    distance: number;
    level: boolean;
}
