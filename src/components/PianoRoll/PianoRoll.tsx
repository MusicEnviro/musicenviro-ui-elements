// =============================================================================
// PIANO ROLL COMPONENT
// =============================================================================

import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { IRollNote, IRhythmTree, tree44, ITreePoint, getRhythmPoints } from '../../musical-data';
import {
	IRange,
	DiatonicStep,
	MidiPitch,
	Mode,
	Pixels,
	subtractPoints,
	stepType,
	IPoint,
	consoleDeleteMe,
} from '@musicenviro/base';
import { useRedrawer } from '../../hooks/useRedrawer';
import { drawLineP } from '../../graphics/canvas-drawing/drawLine';
import { EventEmitter } from 'events';
import { useCanvasMouse } from '../../hooks/useCanvasMouse';
import { absToProp } from '../../graphics/canvas-drawing/convert';
import { drawCircleP } from '../../graphics/canvas-drawing/drawCircle';
import { getPianoRollHover } from './getPianoRollHover';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

type PropCoord = number;

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

export interface IPianoRollProps {
	initialNotes?: IRollNote[];
	tree?: IRhythmTree;
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
	width?: Pixels;
	height?: Pixels;

	/**
	 * @property padding is subtracted from all four sides to get the
	 * representational space (drawing may occur outside the space, for example if the center
	 * of a circle represents a coordinate of 0
	 */
	padding?: Pixels;

	onChange?: (notes: IRollNote[]) => void;
}

const defaultProps: Required<IPianoRollProps> = {
	initialNotes: [],
	tree: tree44,
	stepRange: { min: 0, max: 10 },
	zeroPitch: 36,
	mode: 'Ionian',
	width: 800,
	height: 400,
	padding: 20,
	onChange: notes => {},
};

// -----------------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------------

export const PianoRoll: React.FunctionComponent<IPianoRollProps> = props => {
	const [notes, setNotes] = useState<IRollNote[]>(props.initialNotes);
	const [treePoints, setTreePoints] = useState<ITreePoint[]>(getRhythmPoints(props.tree));
	const [hoverNotes, setHoverNotes] = useState<IRollNote[]>([]);

	useEffect(() => setNotes(props.initialNotes), [props.initialNotes]);

	useEffect(() => {
		const treePoints = getRhythmPoints(props.tree);
		setTreePoints(treePoints);
		setNotes(notes => notes.filter(note => note.treePointIndex < treePoints.length));
	}, [props.tree]);

	const [canvasRef] = useRedrawer<{}>({}, draw, 50, [notes, treePoints, hoverNotes]);

	useCanvasMouse(
		canvasRef,
		{
			onMouseMove: (point: IPoint) => {
				const proportionalPoint = absToProp(canvasRef.current.getContext('2d'), point, {
					padding: props.padding,
				});

				const hover = getPianoRollHover(proportionalPoint, treePoints, props.stepRange);

				setHoverNotes(hover ? [hover] : []);
			},

			onMouseLeave: () => {
				setHoverNotes([]);
			},

			onMouseDown: (point: IPoint) => {
				// const proportionalPoint = absToProp(canvasRef.current.getContext('2d'), point, {
				// 	padding: props.padding,
				// });

				// const hover = getPianoRollHover(proportionalPoint, treePoints, props.stepRange);

				setNotes([...notes, ...hoverNotes]);
			},
		},
		[notes, hoverNotes],
	);

	function draw(ctx: CanvasRenderingContext2D) {
		drawGrid();
		notes.forEach(drawNote);
		hoverNotes.forEach(drawHoverOutline);

		function drawGrid() {
			treePoints.forEach(drawTreePointGridLine);
			drawTreePointGridLine({ position: 1, depth: 0 });

			const stepHeight = 1 / (props.stepRange.max - props.stepRange.min);
			for (let step = props.stepRange.min; step <= props.stepRange.max; step++) {
				drawStepGridLine(step);
			}

			function drawTreePointGridLine(point: ITreePoint) {
				const x: PropCoord = point.position;
				const colorByte = 0 + point.depth * 50;
				const lineWidth = point.depth < 2 ? 2 : 1;
				drawLineP(
					ctx,
					{ padding: props.padding, roundToPixel: true },
					{ x, y: 0 },
					{ x, y: 1 },
					`rgb(${colorByte}, ${colorByte}, ${colorByte})`,
					lineWidth,
				);
			}

			function drawStepGridLine(step: number) {
				// nb. y coordinate is upside-down so we subtract from 1
				const y: PropCoord = 1 - step * stepHeight;
				const lineWidth = stepType(step) === 'Root' ? 2 : 1;

				drawLineP(
					ctx,
					{ padding: props.padding, roundToPixel: true },
					{ x: 0, y },
					{ x: 1, y },
					'darkblue',
					lineWidth,
				);
			}
		}

		function getNoteCoords(note: IRollNote): IPoint {
			const x = treePoints[note.treePointIndex].position;
			const y =
				1 - (note.step - props.stepRange.min) / (props.stepRange.max - props.stepRange.min);
			return { x, y };
		}

		function drawNote(note: IRollNote) {
			drawCircleP(
				ctx,
				{ padding: props.padding, fixedRadius: true, roundToPixel: true },
				getNoteCoords(note),
				12.5,
				'blue',
				true,
				0.5,
			);
		}

		function drawHoverOutline(note: IRollNote) {
			drawCircleP(
				ctx,
				{ padding: props.padding, fixedRadius: true, roundToPixel: true },
				getNoteCoords(note),
				12.5,
				'black',
				false,
				1,
				[3, 3],
			);
		}
	}

	return (
		<div>
			<canvas
				ref={canvasRef}
				className="piano-roll"
				height={props.height}
				width={props.width}
				style={{ border: 'solid 1px' }}
			></canvas>

			<button
				onClick={() =>
					setNotes([
						...notes,
						{
							step: notes.length,
							treePointIndex: 0,
						},
					])
				}
			>
				add note
			</button>
		</div>
	);
};
PianoRoll.defaultProps = defaultProps;
