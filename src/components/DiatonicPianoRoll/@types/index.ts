import { IRhythmTree } from "../../SingleNoteLane/trees";

export interface ICellData {
	active: boolean;
}

export interface ILaneData {
	gridTree: IRhythmTree;
	cells: ICellData[];
}