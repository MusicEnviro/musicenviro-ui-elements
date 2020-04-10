import { MidiPitch } from "@musicenviro/base";
import { CSSProperties } from "react";
import { ILazyCanvasRedrawerProps } from "../../../generic-components/LazyCanvasRedrawer/types";

export interface IFingeredNote {
    pitch: MidiPitch;
    isTonic: boolean;
}

export interface IGuitarChordDiagramProps extends ILazyCanvasRedrawerProps {
    style?: CSSProperties
    baseNote: number | null;
    numFrets: number;
    fingeredNotes: IFingeredNote[];
    color: string;
}

