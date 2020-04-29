import * as React from 'react';
import {
	DiatonicStep,
	IRange,
	MidiPitch,
	Mode,
	Pixels,
	stepType,
	fillRange,
	scaleToSum,
} from '@musicenviro/base';

import styled from 'styled-components';
import { RollLane } from './sub-components/RollLane';
import { lanePadding, stepTypeAppearance } from './config';
import { IRhythmTree, tree44, getRhythmPoints } from '../SingleNoteLane/trees';
import { ILaneData } from './@types';

const Roll = styled.div`
	background-color: #fff;
	border-top: solid 1px black;
	padding-bottom: ${lanePadding}px;
`;

export interface IDiatonicPianoRollProps {
	initialLanes?: ILaneData[];
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
	width?: Pixels;
	height?: Pixels;
	onCellChange?: (lane: number, cell: number, active: boolean) => void;
}

export { ILaneData, ICellData } from './@types';

export const RollContext = React.createContext<{
	mouseDown: boolean;
	dragging: boolean;
	setDragOrigin: (value: { laneIndex: number; cellIndex: number }) => void;
	endDrag: (laneIndex: number, cellIndex: number) => void;
} | null>(null);

export const DiatonicPianoRoll: React.FunctionComponent<IDiatonicPianoRollProps> = props => {
	const roll = React.useRef<HTMLDivElement>();

	const [lanes, setLanes] = React.useState<ILaneData[]>(props.initialLanes);

	const [mouseDown, setMouseDown] = React.useState<boolean>(false);
	const [dragOrigin, setDragOrigin] = React.useState<{ laneIndex: number; cellIndex: number }>(
		null,
	);

	function endDrag(laneIndex: number, cellIndex: number) {
		const noChange = laneIndex === dragOrigin.laneIndex && cellIndex === dragOrigin.cellIndex;
		if (!noChange) {
			props.onCellChange(dragOrigin.laneIndex, dragOrigin.cellIndex, false)
			props.onCellChange(laneIndex, cellIndex, true)
		}
		setDragOrigin(null)
	}

	React.useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			setMouseDown(true);
			e.preventDefault();
		};

		const handleMouseUp = (e: MouseEvent) => {
			setMouseDown(false);
			e.preventDefault();
		};

		roll.current.addEventListener('mousedown', handleMouseDown);
		roll.current.addEventListener('mouseup', handleMouseUp);

		return () => {
			roll.current.removeEventListener('mousedown', handleMouseDown);
			roll.current.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	return (
		<RollContext.Provider value={{ mouseDown, dragging: !!dragOrigin, setDragOrigin, endDrag }}>
			<Roll
				ref={roll}
				className="diatonic-piano-roll"
				style={{ height: props.height, width: props.width }}
			>
				{getLanePercentageHeights(props)
					.map((height, laneIndex) => (
						<RollLane
							laneIndex={laneIndex}
							stepType={stepType(props.stepRange.min + laneIndex)}
							key={'lane' + laneIndex}
							height={height + '%'}
							laneData={lanes[laneIndex]}
							onCellChange={(cellIndex, active) => {
								if (props.onCellChange) {
									props.onCellChange(laneIndex, cellIndex, active);
								}

								// had an else statement here ... to avoid duplication
								setLanes(modifyLaneCell(lanes, laneIndex, cellIndex, active));
							}}
						/>
					))
					.reverse()}
			</Roll>
		</RollContext.Provider>
	);
};

export function modifyLaneCell(
	lanes: ILaneData[],
	laneIndex: number,
	cellIndex: number,
	active: boolean,
): ILaneData[] {
	return lanes.map((lane, li) =>
		laneIndex !== li
			? lane
			: {
					...lane,
					cells: lane.cells.map((cell, ci) =>
						cellIndex !== ci ? cell : { ...cell, active },
					),
			  },
	);
}

export function makeDefaultLanes(stepRange: IRange<DiatonicStep>) {
	return fillRange(stepRange).map(() => ({
		gridTree: tree44,
		cells: getRhythmPoints(tree44).map(() => ({
			active: false,
		})),
	}));
}

function getLanePercentageHeights(props: IDiatonicPianoRollProps): number[] {
	const heightRatios = fillRange(props.stepRange).map(
		step => stepTypeAppearance[stepType(step)].heightRatio,
	);
	return scaleToSum(heightRatios, 100);
}

const defaultStepRange = { min: 0, max: 14 };

DiatonicPianoRoll.defaultProps = {
	initialLanes: makeDefaultLanes(defaultStepRange),
	stepRange: defaultStepRange,
	zeroPitch: 48,
	mode: 'Ionian',
	width: 500,
	height: 300,
};
