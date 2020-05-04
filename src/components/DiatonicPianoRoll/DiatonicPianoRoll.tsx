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

// export const RollContext = React.createContext<{
// mouseDown: boolean;
// dragging: boolean;
// setDragOrigin: (value: { laneIndex: number; cellIndex: number }) => void;
// 	endDrag: (laneIndex: number, cellIndex: number) => void;
// } | null>(null);

export const RollContext = React.createContext<
	(value: { laneIndex: number; cellIndex: number }) => void
>(null);

export const DiatonicPianoRoll: React.FunctionComponent<IDiatonicPianoRollProps> = props => {
	const [lanes, setLanes] = React.useState<ILaneData[]>(props.initialLanes);
	const [dragOrigin, setDragOrigin] = React.useState<{ laneIndex: number; cellIndex: number }>(
		null,
	);

	React.useEffect(() => {
		console.log({dragOrigin})
	}, [dragOrigin])

	return (
		<RollContext.Provider value={setDragOrigin}>
			<Roll
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
								let newLanes = modifyLaneCell(lanes, laneIndex, cellIndex, active);
								if (dragOrigin) {
									if (!active) {
										// shoudln't happen?
										console.log("active = false! shouldn't happen...");
									}
									newLanes = modifyLaneCell(
										newLanes,
										dragOrigin.laneIndex,
										dragOrigin.cellIndex,
										false,
									);
									setDragOrigin(null)
								}

								setLanes(newLanes);
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
