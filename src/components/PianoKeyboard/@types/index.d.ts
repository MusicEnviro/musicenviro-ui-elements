export interface IPianoKeyboardProps {
	onNoteDown: (midiPitch: number, midiVelocity: number) => void;
	onNoteUp: (midiPitch: number) => void;
	keyRange: {
		min: number;
		max: number;
	};
}
