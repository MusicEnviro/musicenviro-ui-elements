import { MidiPitch } from "@musicenviro/base";

export interface IFingeredNote {
    pitch: MidiPitch;
    isTonic: boolean;
}

export interface IGuitarChordDiagramProps {
    baseNote: number | null;
    numFrets: number;
    fingeredNotes: IFingeredNote[];
    color: string;
}

