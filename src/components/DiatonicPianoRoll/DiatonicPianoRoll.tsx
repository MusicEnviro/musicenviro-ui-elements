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

const Roll = styled.div`
	background-color: #ddd;
	border: solid 1px black;
	padding-bottom: ${lanePadding}px;
`;

interface IDiatonicPianoRollProps {
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
	width?: Pixels;
	height?: Pixels;
}

export const DiatonicPianoRoll: React.FunctionComponent<IDiatonicPianoRollProps> = props => {
	// return <div>{JSON.stringify(props)}</div>;

	return (
		<Roll className="diatonic-piano-roll" style={{ height: props.height, width: props.width }}>
			{getLanePercentageHeights(props).map((height, i) => (
				<RollLane
					stepType={stepType(props.stepRange.min + i)}
					key={'lane' + i}
					height={height + '%'}
				/>
			)).reverse()}
		</Roll>
	);
};

function getLanePercentageHeights(props: IDiatonicPianoRollProps): number[] {
	const heightRatios = fillRange(props.stepRange).map(
		step => stepTypeAppearance[stepType(step)].heightRatio,
	);
	return scaleToSum(heightRatios, 100);
}

DiatonicPianoRoll.defaultProps = {
	stepRange: { min: 0, max: 14 },
	zeroPitch: 48,
	mode: 'Ionian',
	width: 500,
	height: 300,
};
