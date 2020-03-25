export function getStringAndFret(semitones: number, position: number | null): {
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

    const reference = position || 0;

    const stringMinimums = [0, 5, 10, 15, 19, 24].map(i => reference + i)

    const string = stringMinimums.findIndex((min, i) => semitones >= min &&
        (!stringMinimums[i + 1] || semitones < stringMinimums[i + 1]))

    const fret = semitones - stringMinimums[string]

    // quick and dirty
    const alternates = string === 4 && fret === 0 ? [{string: 3, fret: 4}] : []

    return { string, fret, alternates };
}
