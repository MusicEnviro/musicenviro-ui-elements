import { IRhythmTree } from "../../../musical-data/trees";

export interface ICellData {
	active: boolean;
}

export interface ILaneData {
	gridTree: IRhythmTree;
	cells: ICellData[];
}