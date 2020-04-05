import { ILazyCanvasRedrawerProps } from "../../../generic-components/LazyCanvasRedrawer/types";

export interface ISingleNoteLaneProps extends ILazyCanvasRedrawerProps {
    onChange: (notes: number[]) => void;
}
