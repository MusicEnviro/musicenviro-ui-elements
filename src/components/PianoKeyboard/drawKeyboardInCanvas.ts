import { IPianoKeyboardProps } from "./@types";

// TODO: lift to base package
type Pixels = number;
type MidiPitch = number;

// TODO: lift to base package
interface IRect {
	left: Pixels;
	top: Pixels;
	right: Pixels;
	bottom: Pixels;
}

interface IKey {
	type: "White" | "Black";
	rect: IRect;
	pitch: MidiPitch;
}

export function drawKeyboardInCanvas(
	ctx: CanvasRenderingContext2D,
	props: IPianoKeyboardProps
): IKey[] {
	const whiteKeys = getWhiteKeys(props, ctx.canvas.width, ctx.canvas.height);
	whiteKeys.forEach(key => drawKeyInCanvas(ctx, key));
	return whiteKeys;
}

function drawKeyInCanvas(ctx: CanvasRenderingContext2D, key: IKey) {
	ctx.fillStyle = key.type === "White" ? "white" : "black";
	ctx.strokeStyle = "black";

	ctx.rect(
		key.rect.left,
		key.rect.top,
		key.rect.right - key.rect.left,
		key.rect.bottom - key.rect.top
	);

	ctx.fill();
	ctx.stroke();
}

function midiPitchIsWhite(note: MidiPitch): boolean {
	return [0, 2, 4, 5, 7, 9, 11].includes(note % 12);
}

function getWhiteKeys(
	props: IPianoKeyboardProps,
	width: Pixels,
	height: Pixels
): IKey[] {
	let whiteNotesInRange = [];
	for (let k = props.keyRange.min; k <= props.keyRange.max; k++) {
		if (midiPitchIsWhite(k)) whiteNotesInRange.push(k);
	}

	const keyWidth: Pixels = width / whiteNotesInRange.length;

	return whiteNotesInRange.map((pitch: MidiPitch, i) => {
		return {
			type: "White",
			rect: {
				left: i * keyWidth,
				top: 0,
				right: (i + 1) * keyWidth,
				bottom: height
			},
			pitch
		};
	});
}
