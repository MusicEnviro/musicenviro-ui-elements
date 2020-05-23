import { ILazyCanvasRedrawerProps } from "../../../generic-components/LazyCanvasRedrawer/types";
import { ITreePoint, IRhythmTree } from "../../../musical-data/trees";

export interface ISingleNoteLaneProps extends ILazyCanvasRedrawerProps {
    notes?: number[] // proportional time in loop (0-1)
    tree?: IRhythmTree;
    onChange?: (notes: number[]) => void;
    noteColor?: string
}
