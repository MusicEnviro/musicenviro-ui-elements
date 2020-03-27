import { IPianoKeyboardProps, IKey } from "./@types";
import { MidiPitch, Pixels } from '@musicenviro/base'


const blackKeyHeightRatio = 0.6;

export function drawKeyboardInCanvas(
	ctx: CanvasRenderingContext2D,
	props: IPianoKeyboardProps,
	selectedKeys: number[]
): IKey[] {
	const whiteKeys = getWhiteKeys(props, ctx.canvas.width, ctx.canvas.height);
	const blackKeys = getBlackKeys(whiteKeys);

	[...whiteKeys, ...blackKeys].forEach(key => drawKeyInCanvas(ctx, key, selectedKeys.includes(key.pitch)));

	return [...whiteKeys, ...blackKeys];
}

function drawKeyInCanvas(ctx: CanvasRenderingContext2D, key: IKey, isSelected: boolean) {
	ctx.fillStyle = getFillStyle()
	ctx.strokeStyle = "black";

	ctx.fillRect(
		key.rect.left,
		key.rect.top,
		key.rect.right - key.rect.left,
		key.rect.bottom - key.rect.top
	);

	ctx.strokeRect(
		key.rect.left,
		key.rect.top,
		key.rect.right - key.rect.left,
		key.rect.bottom - key.rect.top
	);

	// -----------------------------------------------------------------------------
	// function-scope helpers
	// -----------------------------------------------------------------------------

	function getFillStyle() {
		if (key.type === 'White') {
			if (isSelected) {
				return 'lightblue'
			} else {
				return 'white'
			}
		} else {
			if (isSelected) {
				return 'blue'
			} else {
				return 'black'
			}
		}
	}
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

/**
 * deduces positions of black keys based on white keys already calculated.
 * @param whiteKeys
 */
function getBlackKeys(whiteKeys: IKey[]): IKey[] {
	const whiteKeyWidth = whiteKeys[0].rect.right - whiteKeys[0].rect.left;
	const blackKeyWidth = (whiteKeyWidth * 7) / 12;

	return whiteKeys
		.slice(0, -1)
		.filter(whiteKey => [0, 2, 5, 7, 9].includes(whiteKey.pitch % 12))
		.map(whiteKey => {
			const width = whiteKey.rect.right - whiteKey.rect.left;
			const height = whiteKey.rect.bottom - whiteKey.rect.top;

			const diatonicStep = [0, 2, 4, 5, 7, 9].indexOf(
				whiteKey.pitch % 12
			);

			const left =
				whiteKey.rect.right +
				width * [-0.35, -0.25, -0.25, -0.35, -0.3, -0.25][diatonicStep];

			return {
				type: "Black",
				rect: {
					left,
					top: whiteKey.rect.top,
					right: left + blackKeyWidth,
					bottom: whiteKey.rect.top + height * blackKeyHeightRatio
				},
				pitch: whiteKey.pitch + 1
			};
		});
}
