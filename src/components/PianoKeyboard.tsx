import * as React from "react";
import MusicalKeyboard, {
	IKeyOnData,
	IKeyOffData,
	IMusicalKeyboardProps
} from "react-musical-keyboard";

export interface IPianoKeyboardProps {
	onNoteDown: (midiPitch: number, midiVelocity: number) => void;
	onNoteUp: (midiPitch: number) => void;
	keyRange: {
		min: number;
		max: number;
	};
}

export function PianoKeyboard(props: IPianoKeyboardProps) {
	const canvasRef = React.useRef(null);
	return (
		<canvas
			className="keyboard"
			width="600"
			height="100"
			onClick={(e: any) => {
				const canvas = canvasRef.current as HTMLCanvasElement;
				const ctx = canvas.getContext("2d");
				ctx.fillRect(0, 0, 20, 20);
			}}
		></canvas>
	);
}
