import * as React from 'react';
import {
	DiatonicPianoRoll,
	ILaneData,
	modifyLaneCell,
	makeDefaultLanes,
} from '../../components/DiatonicPianoRoll/DiatonicPianoRoll';

export function DiatonicPianoRollExample() {
	const stepRange = {
		min: 0,
		max: 14
	}
	
	const [lanes, setLanes] = React.useState<ILaneData[]>(makeDefaultLanes(stepRange));

	return (
		<DiatonicPianoRoll
			height={250}
			width={900}
			stepRange={stepRange}
			initialLanes={lanes}
			onCellChange={(id, laneIndex, cellIndex, active) => {
				console.log(laneIndex, cellIndex, active);
				setLanes(modifyLaneCell(lanes, laneIndex, cellIndex, active));
			}}
		/>
	);
}
