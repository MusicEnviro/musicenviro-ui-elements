import { IRect } from '@musicenviro/base';
export interface IBlock {
	rect: IRect;
	depth: number;
	unitLength: number;
	id?: number;
}
