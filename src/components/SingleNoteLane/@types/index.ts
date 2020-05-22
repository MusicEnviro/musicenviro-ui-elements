import { ILazyCanvasRedrawerProps } from "../../../generic-components/LazyCanvasRedrawer/types";
import { ITreePoint } from "../../../musical-data/trees";

export interface ISingleNoteLaneProps extends ILazyCanvasRedrawerProps {
    notes?: number[] // proportional time in loop (0-1)
    onChange?: (notes: number[]) => void;
    noteColor?: string
}
