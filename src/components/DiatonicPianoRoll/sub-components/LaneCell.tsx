import * as React from 'react';
import { cellPadding, stepTypeAppearance } from '../config';
import styled from 'styled-components';
import { DiatonicStepType, useWatch } from '@musicenviro/base';

import { paletton } from './paletton';
// import { RollContext } from '../DiatonicPianoRoll';

import * as MouseMonitor from '../../../ui/mouse-monitor'
import { RollContext } from '../DiatonicPianoRoll';

const Cell = styled.div`
	box-sizing: border-box;
	padding-left: ${cellPadding}px;
	padding-top: ${cellPadding * 0.5}px;
	padding-bottom: ${cellPadding * 0.5}px;
	height: 100%;
	width: ${(100 / 16).toFixed(2)}%;
	float: left;
	border-bottom: solid 1px;
`;

const CellContents = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 10%;
`;

interface ILaneCellProps {
	laneIndex: number;
	cellIndex: number;
	depth: number; // depth in rhythm tree
	stepType: DiatonicStepType;
	activated: boolean;
	onChange: (active: boolean) => void;
}

const depthSuffix = [3, 3, 0, 2];

export const LaneCell: React.FunctionComponent<ILaneCellProps> = props => {
	const [clickedHere, setClickedHere] = React.useState<boolean>(false);
	const [showActivated, setShowActivated] = React.useState<boolean>(props.activated);

	React.useEffect(() => {
		setShowActivated(props.activated);
		setClickedHere(false)
	}, [props.activated]);

	useWatch(props, 'LaneCell')

	const setDragOrigin = React.useContext(RollContext);

	return (
		<Cell>
			<CellContents
				style={{
					opacity: (showActivated ? 0.5 : 0.125) + (props.activated ? 0.5 : 0.125),
					backgroundColor:
						paletton[
							`color_${stepTypeAppearance[props.stepType].classStem}_${
								depthSuffix[props.depth]
							}`
						],
				}}
				onMouseDown={e => {
					setClickedHere(true);
					if (!props.activated) {
						setShowActivated(true);
					}

				}}

				onMouseEnter={e => {
					if (MouseMonitor.mouseDown) {
						setShowActivated(true);
						if (clickedHere) setDragOrigin(null)
					}
				}}
				
				onMouseUp={e => {
					setClickedHere(false);
					// if (dragging) {
					// 	endDrag(props.laneIndex, props.cellIndex);
					// } else {
						if (props.activated) {
							setShowActivated(false);
							props.onChange(false);
						} else {
							setShowActivated(true);
							props.onChange(true);
						}
					// }
				}}

				onMouseLeave={e => {
					if (showActivated && !props.activated) setShowActivated(false);
					if (props.activated && clickedHere) {
						setShowActivated(false);
						setDragOrigin({laneIndex: props.laneIndex, cellIndex: props.cellIndex})
						// listenForWindowMouseup()
					}
				}}

				// draggable={showActivated}
			></CellContents>
		</Cell>
	);
};
