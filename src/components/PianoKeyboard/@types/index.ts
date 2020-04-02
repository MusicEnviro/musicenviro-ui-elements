
import { MidiPitch, IRect, IRange } from '@musicenviro/base'
import { ILazyCanvasRedrawerProps } from '../../LazyCanvasRedrawer/types';

export interface IKey {
	type: "White" | "Black";
	rect: IRect;
	pitch: MidiPitch;
}

export interface IPianoKeyboardProps extends ILazyCanvasRedrawerProps {
	onNoteDown: (midiPitch: number, midiVelocity: number) => void;
	onNoteUp: (midiPitch: number) => void;
	keyRange: IRange
}

export interface IPianoKeyboardState {
	depressedKeys: MidiPitch[]
}
