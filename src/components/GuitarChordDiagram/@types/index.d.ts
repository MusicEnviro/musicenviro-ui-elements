
export interface IFingeredNote {
    semitonesFromBase: number;
    isTonic: boolean;
}

export interface IGuitarChordDiagramProps {
    position: number | null;
    numFrets: number;
    fingeredNotes: IFingeredNote[];
    color: string;
}

