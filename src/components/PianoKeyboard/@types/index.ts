
import { MidiPitch, IRect, IRange } from '@musicenviro/base'
import { ILazyCanvasRedrawerProps } from '../../../generic-components/LazyCanvasRedrawer/types';

export interface IKey {
	type: "White" | "Black";
	rect: IRect;
	pitch: MidiPitch;
}

export interface IPianoKeyboardProps extends ILazyCanvasRedrawerProps {
	onNoteDown: (midiPitch: number, midiVelocity: number, depressedKeys: number[]) => void;
	onNoteUp: (midiPitch: number, depressedKeys: number[]) => void;
	keyRange: IRange<MidiPitch>
}

export interface IPianoKeyboardState {
	depressedKeys: MidiPitch[]
}
