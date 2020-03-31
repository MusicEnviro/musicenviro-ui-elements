import { MidiPitch } from "@musicenviro/base";

export function getStringAndFret(pitch: MidiPitch, baseNote: number | null): {
    string: number;
    fret: number;
    alternates: Array<{
        string: number;
        fret: number;
    }>;
} | null {
    // if position is null, then semitones are interpreted as relative to first fret, lowest string
    // also note the string number starts at the lowest string (E1) as 0, going up to 5
    // and 0 is the first fret.

    const stringMinimums = [0, 5, 10, 15, 19, 24].map(i => baseNote + i)

    const string = stringMinimums.findIndex((min, i) => pitch >= min &&
        (!stringMinimums[i + 1] || pitch < stringMinimums[i + 1]))

    const fret = pitch - stringMinimums[string]

    // quick and dirty
    const alternates = string === 4 && fret === 0 ? [{string: 3, fret: 4}] : []

    return { string, fret, alternates };
}
