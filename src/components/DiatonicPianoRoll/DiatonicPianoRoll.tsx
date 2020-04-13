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
import { ILaneData } from './@types'

const Roll = styled.div`
	background-color: #fff;
	border-top: solid 1px black;
	padding-bottom: ${lanePadding}px;
`;

interface IDiatonicPianoRollProps {
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
	width?: Pixels;
	height?: Pixels;
	// onClick?: (laneIndex: number, cellIndex: number) => void;
}


export const DiatonicPianoRoll: React.FunctionComponent<IDiatonicPianoRollProps> = props => {
	const [lanes, setLanes] = React.useState<ILaneData[]>(makeDefaultLanes());

	return (
		<Roll className="diatonic-piano-roll" style={{ height: props.height, width: props.width }}>
			{getLanePercentageHeights(props)
				.map((height, i) => (
					<RollLane
						stepType={stepType(props.stepRange.min + i)}
						key={'lane' + i}
						height={height + '%'}
						laneData={lanes[i]}
						onClick={cellIndex => toggleCell(i, cellIndex)}
					/>
				))
				.reverse()}
		</Roll>
	);

	// ----------------------------------------------------------------------------
	// function scope helpers
	// ----------------------------------------------------------------------------

	function makeDefaultLanes() {
		return fillRange(props.stepRange).map(() => ({
			gridTree: tree44,
			cells: getRhythmPoints(tree44).map(() => ({
				active: false,
			})),
		}));
	}

	function toggleCell(laneIndex: number, cellIndex: number) {
		console.log(laneIndex, cellIndex)
		setLanes(
			lanes.map((lane, li) =>
				laneIndex !== li
					? lane
					: {
							...lane,
							cells: lane.cells.map((cell, ci) =>
								cellIndex !== ci ? cell : { ...cell, active: !cell.active },
							),
					  },
			),
		);
	}
};

function getLanePercentageHeights(props: IDiatonicPianoRollProps): number[] {
	const heightRatios = fillRange(props.stepRange).map(
		step => stepTypeAppearance[stepType(step)].heightRatio,
	);
	return scaleToSum(heightRatios, 100);
}

const defaultStepRange = { min: 0, max: 14 };

DiatonicPianoRoll.defaultProps = {
	stepRange: defaultStepRange,
	zeroPitch: 48,
	mode: 'Ionian',
	width: 500,
	height: 300,
};
